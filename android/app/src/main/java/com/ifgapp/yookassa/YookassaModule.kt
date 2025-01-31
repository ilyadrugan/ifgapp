package com.ifgapp.yookassa

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResult
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat.getString
import androidx.core.app.ActivityCompat.startActivityForResult
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.th3rdwave.safeareacontext.getReactContext
import ru.yoomoney.sdk.kassa.payments.Checkout
import ru.yoomoney.sdk.kassa.payments.Checkout.createTokenizationResult
import ru.yoomoney.sdk.kassa.payments.Checkout.createTokenizeIntent
import ru.yoomoney.sdk.kassa.payments.checkoutParameters.Amount
import ru.yoomoney.sdk.kassa.payments.checkoutParameters.GooglePayParameters
import ru.yoomoney.sdk.kassa.payments.checkoutParameters.PaymentMethodType
import ru.yoomoney.sdk.kassa.payments.checkoutParameters.PaymentParameters
import ru.yoomoney.sdk.kassa.payments.checkoutParameters.SavePaymentMethod
import ru.yoomoney.sdk.kassa.payments.checkoutParameters.TestParameters
import java.math.BigDecimal
import java.util.Currency
import java.util.Locale

class YookassaModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var callback: Callback? = null

    companion object {
        private const val REQUEST_CODE_TOKENIZE = 1
        private const val REQUEST_CODE_CONFIRM = 2
    }

    init {
        // Регистрируем слушателя событий активности
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "YookassaModule"
    @ReactMethod
    fun start3DSecure(confirmationUrl: String, callback: Callback) {
        val activity = currentActivity
        this.callback = callback
        if (activity == null) {
            callback?.invoke("Activity is null")
            return
        }
        val intent = Checkout.createConfirmationIntent(
            reactApplicationContext,
            confirmationUrl,
            PaymentMethodType.BANK_CARD,
            "test_NDAwMjA4m51UR7fcY8omrTVV2JmlV0QCMM0QfodWAtE",
//           "488632"
        )
        activity.startActivityForResult(intent, REQUEST_CODE_CONFIRM)
    }
    @ReactMethod
    fun startTokenize(phoneNumber: String, title: String, subtitle: String, amount: Double, callback: Callback) {
        Log.i("Yookasssa", "startTokenize" + phoneNumber)
        this.callback = callback
        val activity = currentActivity
        if (activity == null) {
            callback.invoke("Activity is null")
            return
        }

        val paymentMethodTypes = setOf(
            PaymentMethodType.BANK_CARD,
            // PaymentMethodType.YOO_MONEY,
            // PaymentMethodType.SBERBANK
        )
        val paymentParameters = PaymentParameters(
            amount = Amount(BigDecimal.valueOf(amount), Currency.getInstance("RUB")),
            title = title,
            subtitle = subtitle,
            clientApplicationKey = "test_NDAwMjA4m51UR7fcY8omrTVV2JmlV0QCMM0QfodWAtE",
            shopId = "400208",
            savePaymentMethod = SavePaymentMethod.ON,
            paymentMethodTypes = paymentMethodTypes,
//            authCenterClientId = "hitm6hg51j1d3g1u3ln040bajiol903b",
//            userPhoneNumber = phoneNumber
        )

        val intent = createTokenizeIntent(reactApplicationContext, paymentParameters, TestParameters(showLogs = true))

        // Запускаем активность
        activity.startActivityForResult(intent, REQUEST_CODE_TOKENIZE)
    }

    // Обработка результата активности
    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        Log.i("Yookasssa", "onActivityResult " +requestCode + ' ' + resultCode)

        if (requestCode == REQUEST_CODE_TOKENIZE) {
            if (resultCode == Activity.RESULT_OK) {
                Log.i("Yookasssa", "Activity.RESULT_OK " + resultCode)

                  val tokenResult = createTokenizationResult(data!!)
                    val resultMap = WritableNativeMap().apply {
                        putString("status", "RESULT_OK")
                        putString("paymentToken", tokenResult.paymentToken)
                        putString("paymentMethodType", tokenResult.paymentMethodType.toString())
                    }
                    callback?.invoke(resultMap)

//                start3DSecure("https://3ds-gate.yoomoney.ru/card-auth?acsUri=https%3A%2F%2Fyookassa.ru%3A443%2Fsandbox%2Fbank-card%2F3ds&PaReq=Q1VSUkVOQ1k9UlVCJk9SREVSPTJmMjkyZmM4LTAwMGYtNTAwMC05MDAwLTFjM2Y3YTc5ZmNlMiZURVJNSU5BTD05OTk5OTgmRVhQX1lFQVI9MjUmQU1PVU5UPTEwLjAwJlJFQ1VSUkVOVF9PUEVSQVRJT05fVFlQRT1Jbml0aWFsJkNBUkRfVFlQRT1QQU4mVFJUWVBFPTAmRVhQPTAyJkNWQzI9NDU2JkNBUkQ9NTU1NTU1NTU1NTU1NDQ3NyZOQU1FPQ%3D%3D&TermUrl=https%3A%2F%2Fpaymentcard.yoomoney.ru%3A443%2F3ds%2Fchallenge%2F241%2F1DM6T20i3QJ46o6lp2cbz1Fh4AcZ..001.202501&MD=1737956361129-22871370505732618456")
//                val result = data?.let { createTokenizationResult(it) }
            } else if (resultCode == Activity.RESULT_CANCELED) {
                Log.i("Yookasssa", "Activity.RESULT_CANCELED " + resultCode)
                val errorMap = WritableNativeMap().apply {
                    putString("status", "RESULT_CANCELED")
                }
                callback?.invoke(errorMap)
            }
        }
        else if (requestCode === REQUEST_CODE_CONFIRM) {
            Log.i("Yookasssa", "REQUEST_CODE_CONFIRM " + requestCode)

            if (resultCode == Activity.RESULT_OK) {
                Log.i("Yookasssa", "Activity.RESULT_OK " + resultCode)
                val resultMap = WritableNativeMap().apply {
                    putString("status", "RESULT_OK")
                }
                callback?.invoke(resultMap)
            } else if (resultCode == Activity.RESULT_CANCELED) {
                Log.i("Yookasssa", "Activity.RESULT_CANCELED " + resultCode)
                val errorMap = WritableNativeMap().apply {
                    putString("status", "RESULT_CANCELED")
                }
                callback?.invoke(errorMap)
            }
        }
    }

    // Этот метод не используется, но должен быть реализован
    override fun onNewIntent(intent: Intent?) {}
}
