import Foundation
import HealthKit

@objc(HealthModule)
class HealthModule: NSObject {
    private let healthStore = HKHealthStore()
  @objc func requestAuthorization(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        print("requestAuth")
        guard let stepCountType = HKObjectType.quantityType(forIdentifier: .stepCount),
                let flightsClimbedType = HKObjectType.quantityType(forIdentifier: .flightsClimbed),
                let activeEnergyBurnedType = HKObjectType.quantityType(forIdentifier: .activeEnergyBurned) else {
              reject("E_INVALID_TYPES", "Failed to create data types", nil)
              return
          }
          
          let dataTypes: Set<HKObjectType> = [stepCountType, flightsClimbedType, activeEnergyBurnedType]
          
          healthStore.requestAuthorization(toShare: nil, read: dataTypes) { success, error in
              if success {
                  resolve("Authorization granted")
              } else {
                print("error")
                  // Если ошибка есть, передаем её в reject
                  if let error = error {
                      reject("E_AUTHORIZATION_DENIED", "Authorization denied", error)
                  } else {
                      reject("E_UNKNOWN_ERROR", "Unknown error occurred", nil)
                  }
              }
          }
    }
  @objc func fetchHealthData(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        let stepType = HKQuantityType.quantityType(forIdentifier: .stepCount)!
        let flightsType = HKQuantityType.quantityType(forIdentifier: .flightsClimbed)!
        let caloriesType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)!
        
        let now = Date()
        let startOfDay = Calendar.current.startOfDay(for: now)
        let predicate = HKQuery.predicateForSamples(withStart: startOfDay, end: now, options: .strictStartDate)
        
        let group = DispatchGroup()
        var results: [String: Double] = [:]
        
        func queryData(for type: HKQuantityType, key: String) {
            group.enter()
            let query = HKStatisticsQuery(quantityType: type, quantitySamplePredicate: predicate, options: .cumulativeSum) { _, statistics, _ in
                if let quantity = statistics?.sumQuantity() {
                  if (key != "caloriesBurned"){
                    results[key] = quantity.doubleValue(for: HKUnit.count())
                  }
                      else {
                    results[key] = quantity.doubleValue(for: .kilocalorie())
                  }
                } else {
                    results[key] = 0.0
                }
                group.leave()
            }
            healthStore.execute(query)
        }
        
        queryData(for: stepType, key: "steps")
        queryData(for: flightsType, key: "flightsClimbed")
        queryData(for: caloriesType, key: "caloriesBurned")
        
        group.notify(queue: .main) {
            resolve(results)
        }
    }
  @objc(fetchHealthDataForDate:withResolver:withRejecter:)
    func fetchHealthDataForDate(_ dateString: NSString, withResolver resolve: @escaping RCTPromiseResolveBlock, withRejecter reject: @escaping RCTPromiseRejectBlock) {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        formatter.locale = Locale(identifier: "en_US_POSIX")

        guard let date = formatter.date(from: dateString as String) else {
            reject("E_INVALID_DATE", "Cannot parse date from string. Expected format: YYYY-MM-DD", nil)
            return
        }

        let stepType = HKQuantityType.quantityType(forIdentifier: .stepCount)!
        let flightsType = HKQuantityType.quantityType(forIdentifier: .flightsClimbed)!
        let caloriesType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)!

        let calendar = Calendar.current
        let startOfDay = calendar.startOfDay(for: date)
        let endOfDay = calendar.date(byAdding: .day, value: 1, to: startOfDay)!

        let predicate = HKQuery.predicateForSamples(withStart: startOfDay, end: endOfDay, options: .strictStartDate)

        let group = DispatchGroup()
        var results: [String: Double] = [:]

        func queryData(for type: HKQuantityType, key: String) {
            group.enter()
            let query = HKStatisticsQuery(quantityType: type, quantitySamplePredicate: predicate, options: .cumulativeSum) { _, statistics, _ in
                if let quantity = statistics?.sumQuantity() {
                    if key != "caloriesBurned" {
                        results[key] = quantity.doubleValue(for: HKUnit.count())
                    } else {
                        results[key] = quantity.doubleValue(for: .kilocalorie())
                    }
                } else {
                    results[key] = 0.0
                }
                group.leave()
            }
            healthStore.execute(query)
        }

        queryData(for: stepType, key: "steps")
        queryData(for: flightsType, key: "flightsClimbed")
        queryData(for: caloriesType, key: "caloriesBurned")

        group.notify(queue: .main) {
            resolve(results)
        }
    }
    @objc(fetchHealthDataLast30Days:withRejecter:)
    func fetchHealthDataLast30Days(_ resolve: @escaping RCTPromiseResolveBlock, withRejecter reject: @escaping RCTPromiseRejectBlock) {
        let calendar = Calendar.current
        let now = Date()
        guard let startDate = calendar.date(byAdding: .day, value: -30, to: now) else {
            reject("E_DATE_ERROR", "Cannot calculate start date", nil)
            return
        }

        let types: [(HKQuantityTypeIdentifier, String, HKUnit)] = [
            (.stepCount, "steps", HKUnit.count()),
            (.flightsClimbed, "flightsClimbed", HKUnit.count()),
            (.activeEnergyBurned, "caloriesBurned", .kilocalorie())
        ]

        let group = DispatchGroup()
        var resultByDate: [String: [String: Double]] = [:]

        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"

        for (typeId, key, unit) in types {
            guard let quantityType = HKQuantityType.quantityType(forIdentifier: typeId) else {
                reject("E_TYPE_ERROR", "Unable to create type for \(key)", nil)
                return
            }

            group.enter()
            let predicate = HKQuery.predicateForSamples(withStart: startDate, end: now, options: .strictStartDate)
            let query = HKStatisticsCollectionQuery(
                quantityType: quantityType,
                quantitySamplePredicate: predicate,
                options: .cumulativeSum,
                anchorDate: calendar.startOfDay(for: now),
                intervalComponents: DateComponents(day: 1)
            )

            query.initialResultsHandler = { _, results, error in
                if let stats = results {
                    stats.enumerateStatistics(from: startDate, to: now) { statistics, _ in
                        let dateKey = dateFormatter.string(from: statistics.startDate)
                        let value = statistics.sumQuantity()?.doubleValue(for: unit) ?? 0.0
                        if resultByDate[dateKey] == nil {
                            resultByDate[dateKey] = [:]
                        }
                        resultByDate[dateKey]?[key] = value
                    }
                } else {
                    print("Query error for \(key): \(String(describing: error))")
                }
                group.leave()
            }

            healthStore.execute(query)
        }

        group.notify(queue: .main) {
            // Преобразуем словарь в массив [{date: "2025-06-21", steps: ..., ...}, ...]
            let sortedDates = resultByDate.keys.sorted()
            let finalResult: [[String: Any]] = sortedDates.map { date in
                var entry: [String: Any] = ["date": date]
                if let metrics = resultByDate[date] {
                    for (key, value) in metrics {
                        entry[key] = value
                    }
                }
                return entry
            }
            resolve(finalResult)
        }
    }

}
