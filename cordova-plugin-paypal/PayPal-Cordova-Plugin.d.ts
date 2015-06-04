/**
 * Created by shengjie.yu89@gmail.com on 04/06/15.
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 <shengjie.yu89@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * PayPal-Cordova-Plugin: 3.1.8
 * @see https://github.com/paypal/PayPal-Cordova-Plugin
 */


// Type definition for:  [https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/cdv-plugin-paypal-mobile-sdk.js]
declare var PayPalMobile: PayPalMobile;
interface PayPalMobile {
    /**
     * Retrieve the version of the PayPal iOS SDK library. Useful when contacting support.
     * @param {Function} completionCallback: a callback function accepting a string
     */
    version(completionCallback:Function);

    /**
     * You MUST call this method to initialize the PayPal Mobile SDK.
     *
     * The PayPal Mobile SDK can operate in different environments to facilitate development and testing.
     *
     * @param {Object} clientIdsForEnvironments: set of client ids for environments
     * Example: var clientIdsForEnvironments = {
     *  PayPalEnvironmentProduction : @"my-client-id-for-Production",
     *  PayPalEnvironmentSandbox : @"my-client-id-for-Sandbox"
     *  }
     * @param {Function} completionCallback: a callback function on success
     */
    init(clientIdsForEnvironments, completionCallback:Function);

    /**
     * You must preconnect to PayPal to prepare the device for processing payments.
     * This improves the user experience, by making the presentation of the
     * UI faster. The preconnect is valid for a limited time, so
     * the recommended time to preconnect is on page load.
     *
     * @param {String} environment: available options are "PayPalEnvironmentNoNetwork", "PayPalEnvironmentProduction" and "PayPalEnvironmentSandbox"
     * @param {PayPalConfiguration} configuration: PayPalConfiguration object, for Future Payments merchantName, merchantPrivacyPolicyURL
     *      and merchantUserAgreementURL must be set be set
     * @param {Function} completionCallback: a callback function on success
     */
    prepareToRender(environment, configuration, completionCallback:Function);


    /**
     * Start PayPal UI to collect payment from the user.
     * See https://developer.paypal.com/webapps/developer/docs/integration/mobile/ios-integration-guide/
     * for more documentation of the params.
     *
     * @param {Object} payment: PayPalPayment object
     * @param {Function} completionCallback: a callback function accepting a js object, called when the user has completed payment
     * @param {Function} cancelCallback: a callback function accepting a reason string, called when the user cancels the payment
     */
    renderSinglePaymentUI(payment, completionCallback:Function, cancelCallback:Function);

    /**
     * @deprecated
     * Once a user has consented to future payments, when the user subsequently initiates a PayPal payment
     * from their device to be completed by your server, PayPal uses a Correlation ID to verify that the
     * payment is originating from a valid, user-consented device+application.
     * This helps reduce fraud and decrease declines.
     * This method MUST be called prior to initiating a pre-consented payment (a "future payment") from a mobile device.
     * Pass the result to your server, to include in the payment request sent to PayPal.
     * Do not otherwise cache or store this value.
     *
     * @param {String} environment: available options are "PayPalEnvironmentNoNetwork", "PayPalEnvironmentProduction" and "PayPalEnvironmentSandbox"
     * @param {Function} callback: applicationCorrelationID Your server will send this to PayPal in a 'Paypal-Application-Correlation-Id' header.
     */
    applicationCorrelationIDForEnvironment(environment, callback:Function);


    /**
     * Once a user has consented to future payments, when the user subsequently initiates a PayPal payment
     * from their device to be completed by your server, PayPal uses a Correlation ID to verify that the
     * payment is originating from a valid, user-consented device+application.
     * This helps reduce fraud and decrease declines.
     * This method MUST be called prior to initiating a pre-consented payment (a "future payment") from a mobile device.
     * Pass the result to your server, to include in the payment request sent to PayPal.
     * Do not otherwise cache or store this value.
     *
     * @param {Function} callback: clientMetadataID Your server will send this to PayPal in a 'PayPal-Client-Metadata-Id' header.
     */
    clientMetadataID(callback:Function);

    /**
     * Please Read Docs on Future Payments at https://github.com/paypal/PayPal-iOS-SDK#future-payments
     *
     * @param {Function} completionCallback: a callback function accepting a js object with future payment authorization
     * @param {Function} cancelCallback: a callback function accepting a reason string, called when the user canceled without agreement
     */
    renderFuturePaymentUI(completionCallback:Function, cancelCallback:Function);


    /**
     * Please Read Docs on Profile Sharing at https://github.com/paypal/PayPal-iOS-SDK#profile-sharing
     *
     * @param {Array} scopes: scopes Set of requested scope-values. Accepted scopes are: openid, profile, address, email, phone, futurepayments and paypalattributes
     * See https://developer.paypal.com/docs/integration/direct/identity/attributes/ for more details
     * @param {Function} completionCallback: a callback function accepting a js object with future payment authorization
     * @param {Function} cancelCallback: a callback function accepting a reason string, called when the user canceled without agreement
     */
    renderProfileSharingUI(scopes, completionCallback:Function, cancelCallback:Function);
}

// Type definition for: [https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js]

/**
 * You use a PayPalConfiguration object to configure many aspects of how the SDK behaves.
 * see defaults for options available
 */
declare function PayPalConfiguration(options: PayPalConfiguration): PayPalConfiguration;

declare class PayPalItem {
    public name:string;
    public quantity:number;
    public price:string;
    public currency:string;
    public sku:string;

    /**
     * The PayPalItem class defines an optional itemization for a payment.
     * @see https://developer.paypal.com/docs/api/#item-object for more details.
     * @param {String} name: Name of the item. 127 characters max
     * @param {Number} quantity: Number of units. 10 characters max.
     * @param {String} price: Unit price for this item 10 characters max.
     * May be negative for "coupon" etc
     * @param {String} currency: ISO standard currency code.
     * @param {String} sku: The stock keeping unit for this item. 50 characters max (optional)
     */
    constructor(name:string,
                quantity:number,
                price:string,
                currency:string,
                sku:string);
}

declare class PayPalPaymentDetails {
    public subtotal: string;
    public shipping: string;
    public tax:string;
    /**
     * The PayPalPaymentDetails class defines optional amount details.
     * @param {String} subtotal: Sub-total (amount) of items being paid for. 10 characters max with support for 2 decimal places.
     * @param {String} shipping: Amount charged for shipping. 10 characters max with support for 2 decimal places.
     * @param {String} tax: Amount charged for tax. 10 characters max with support for 2 decimal places.
     * @see https://developer.paypal.com/webapps/developer/docs/api/#details-object for more details.
     */
    constructor(subtotal: string,
                shipping: string,
                tax:string);
}

declare class PayPalPayment {

    public amount:string;
    public currencyCode:string;
    public shortDescription:string;
    public intent:string;
    public details;

    /**
     * Convenience constructor. Returns a PayPalPayment with the specified amount, currency code, and short description.
     * @param {String} amount: The amount of the payment.
     * @param {String} currencyCode: The ISO 4217 currency for the payment.
     * @param {String} shortDescription: A short descripton of the payment.
     * @param {String} intent: "Sale" for an immediate payment.
     * "Auth" for payment authorization only, to be captured separately at a later time.
     * "Order" for taking an order, with authorization and capture to be done separately at a later time.
     * @param {PayPalPaymentDetails} details: PayPalPaymentDetails object (optional)
     */
    constructor(amount:string,
                currencyCode:string,
                shortDescription:string,
                intent:string,
                details);

    /**
     * Optional invoice number, for your tracking purposes. (up to 256 characters)
     * @param {String} invoiceNumber: The invoice number for the payment.
     */
    public invoiceNumber(invoiceNumber:string):void;

    /**
     * Optional text, for your tracking purposes. (up to 256 characters)
     * @param {String} custom: The custom text for the payment.
     */
    public custom(custom:string):void;


    /**
     * Optional text which will appear on the customer's credit card statement. (up to 22 characters)
     * @param {String} softDescriptor: credit card text for payment
     */
    public softDescriptor(softDescriptor:string):void;

    /**
     * Optional Build Notation code ("BN code"), obtained from partnerprogram@paypal.com,
     * for your tracking purposes.
     * @param {String} bnCode: bnCode for payment
     */
    public bnCode(bnCode:string):void;

    /**
     * Optional array of PayPalItem objects. @see PayPalItem
     * @note If you provide one or more items, be sure that the various prices correctly
     * sum to the payment `amount` or to `paymentDetails.subtotal`.
     * @param {Array<PayPalItem>} items
     */
    public items(items:Array<PayPalItem>):void;

    /**
     * Optional customer shipping address, if your app wishes to provide this to the SDK.
     * @note make sure to set `payPalShippingAddressOption` in PayPalConfiguration to 1 or 3.
     * @param {Object} shippingAddress: PayPalShippingAddress object
     */
    public shippingAddress(shippingAddress: PayPalShippingAddress):void;
}

declare class PayPalShippingAddress {
    public recipientName:string;
    public line1:string;
    public line2:string;
    public city:string;
    public state:string;
    public postalCode:string;
    public countryCode:string;


    /**
     * See the documentation of the individual properties for more detail.
     * @param {String} recipientName: Name of the recipient at this address. 50 characters max.
     * @param {String} line1: Line 1 of the address (e.g., Number, street, etc). 100 characters max.
     * @param {String} line2: Line 2 of the address (e.g., Suite, apt #, etc). 100 characters max. Optional.
     * @param {String} city: City name. 50 characters max.
     * @param {String} state: 2-letter code for US states, and the equivalent for other countries. 100 characters max. Required in certain countries.
     * @param {String} postalCode: ZIP code or equivalent is usually required for countries that have them. 20 characters max. Required in certain countries.
     * @param {String} countryCode: 2-letter country code. 2 characters max.
     */
    constructor(recipientName:string,
                line1:string,
                line2:string,
                city:string,
                state:string,
                postalCode:string,
                countryCode:string);
}



interface PayPalConfiguration {
    /// Will be overridden by email used in most recent PayPal login.
    defaultUserEmail?: string;
    /// Will be overridden by phone country code used in most recent PayPal login
    defaultUserPhoneCountryCode?: string;
    /// Will be overridden by phone number used in most recent PayPal login.
    /// @note If you set defaultUserPhoneNumber, be sure to also set defaultUserPhoneCountryCode.
    defaultUserPhoneNumber?: string;
    /// Your company name, as it should be displayed to the user
    /// when requesting consent via a PayPalFuturePaymentViewController.
    merchantName: string;
    /// URL of your company's privacy policy, which will be offered to the user
    /// when requesting consent via a PayPalFuturePaymentViewController.
    merchantPrivacyPolicyURL: string;
    /// URL of your company's user agreement, which will be offered to the user
    /// when requesting consent via a PayPalFuturePaymentViewController.
    merchantUserAgreementURL: string;
    /// If set to NO, the SDK will only support paying with PayPal, not with credit cards.
    /// This applies only to single payments (via PayPalPaymentViewController).
    /// Future payments (via PayPalFuturePaymentViewController) always use PayPal.
    /// Defaults to YES
    acceptCreditCards?: boolean;
    /// For single payments, options for the shipping address.
    /// - 0 - PayPalShippingAddressOptionNone: no shipping address applies.
    /// - 1 - PayPalShippingAddressOptionProvided: shipping address will be provided by your app,
    ///   in the shippingAddress property of PayPalPayment.
    /// - 2 - PayPalShippingAddressOptionPayPal: user will choose from shipping addresses on file
    ///   for their PayPal account.
    /// - 3 - PayPalShippingAddressOptionBoth: user will choose from the shipping address provided by your app,
    ///   in the shippingAddress property of PayPalPayment, plus the shipping addresses on file for the user's PayPal account.
    /// Defaults to 0 (PayPalShippingAddressOptionNone).
    payPalShippingAddressOption?: number;
    /// If set to YES, then if the user pays via their PayPal account,
    /// the SDK will remember the user's PayPal username or phone number;
    /// if the user pays via their credit card, then the SDK will remember
    /// the PayPal Vault token representing the user's credit card.
    ///
    /// If set to NO, then any previously-remembered username, phone number, or
    /// credit card token will be erased, and subsequent payment information will
    /// not be remembered.
    ///
    /// Defaults to YES.
    rememberUser?: boolean;
    /// If not set, or if set to nil, defaults to the device's current language setting.
    ///
    /// Can be specified as a language code ("en", "fr", "zh-Hans", etc.) or as a locale ("en_AU", "fr_FR", "zh-Hant_HK", etc.).
    /// If the library does not contain localized strings for a specified locale, then will fall back to the language. E.g., "es_CO" -> "es".
    /// If the library does not contain localized strings for a specified language, then will fall back to American English.
    ///
    /// If you specify only a language code, and that code matches the device's currently preferred language,
    /// then the library will attempt to use the device's current region as well.
    /// E.g., specifying "en" on a device set to "English" and "United Kingdom" will result in "en_GB".
    ///
    /// These localizations are currently included:
    /// da,de,en,en_AU,en_GB,en_SV,es,es_MX,fr,he,it,ja,ko,nb,nl,pl,pt,pt_BR,ru,sv,tr,zh-Hans,zh-Hant_HK,zh-Hant_TW.
    languageOrLocale?: string;
    /// Normally, the SDK blurs the screen when the app is backgrounded,
    /// to obscure credit card or PayPal account details in the iOS-saved screenshot.
    /// If your app already does its own blurring upon backgrounding, you might choose to disable this.
    /// Defaults to NO.
    disableBlurWhenBackgrounding?: boolean;
    /// If you will present the SDK's view controller within a popover, then set this property to YES.
    /// Defaults to NO. (iOS only)
    presentingInPopover?: boolean;
    /// Sandbox credentials can be difficult to type on a mobile device. Setting this flag to YES will
    /// cause the sandboxUserPassword and sandboxUserPin to always be pre-populated into login fields.
    ///
    /// This setting will have no effect if the operation mode is production.
    forceDefaultsInSandbox?: boolean;
    /// Password to use for sandbox if 'forceDefaultsInSandbox' is set.
    sandboxUserPassword?: string;
    /// PIN to use for sandbox if 'forceDefaultsInSandbox' is set.
    sandboxUserPin?: string;
}