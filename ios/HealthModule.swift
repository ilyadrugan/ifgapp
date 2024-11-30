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
                    results[key] = quantity.doubleValue(for: HKUnit.count())
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
}
