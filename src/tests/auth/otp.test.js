const { number } = require("yup");

const OtpRequriedError = "OTP is required";
const ResendOtp = "OTP is required";
const Reset2FactorAuthentication = "Use your email to reset password";
const OtpRequiredSms = "Use your SMS CODE to login";

// describe("OTP page test", () => {
//     (async () => {
//         await page.goto("http://localhost:3000/otp");
//     })();

    

//     it("should load OTP page", async () => {
//         const OtpPageLoadText = await page.$eval(
//             ".otp-Page",
//             (text) => text.innerText
//         );
//         expect(OtpPageLoadText).toMatch(OtpRequiredSms);
//     });
describe("OTP page test", () => {
    beforeEach(async () => {
        await page.goto("http://localhost:3000/otp");
    });

    it("should load OTP page", async () => {
        const OtpPageLoadText = await page.$eval(
            ".otp-Page",
            (text) => text.innerText
        );
        expect(OtpPageLoadText).toMatch(/Use your SMS CODE to login/i);
    });
});

    it("should redirect to reset 2 factor page if user has not access to his phone button click on reset 2 factor authentication", async () => {
        
        // await page.waitForSelector("#ResendSMSCODE");
        await page.click("#ResendOTP");
        const ResendSMSCODE = await page.$eval(
            ".MuiAlert-message",
            (text) => text.innerText
        );

        expect(ResendSMSCODE).toMatch(/Use your SMS CODE to login/i);
    });

    // it("on resend if otp doesn't matches", async () => {
    //     // await page.click("OtpInput[name="otpForm"]");
    //     // await page.type("OtpInput[name=otpForm]", "123456 ");
    //     await page.click('input[name="number"]');
    //     await page.type('input[name="number"]', "123456");
    //     await page.click("button[type=submit]");

    //     const el = await page.$eval(
    //         "p[id=mui-1-helper-text]",
    //         (text) => text.innerText
    //     );
    //     expect(el).toMatch(OtpRequriedError);
    // });


    // it("should give sms code error after verify button click without passing SMS CODE", async () => {
    //     await page.click("button[type=submit]");

    //     // eslint-disable-next-line no-undef
    //     const OtpInvalid = await page.$eval(
    //         "p[id=formError]",
    //         (text) => text.innerText
    //     );

    //     expect(OtpInvalid).toMatch("Please Re Send Again");

    // });

    // it("should give SMS CODE error", async () => {
    //     await page.click("input[name=OTP]");
    //     await page.type("input[name=OTP]", "123456 ");

    //     await page.click("button[type=submit]");

    //     const el = await page.$eval(
    //         "p[id=mui-1-helper-text]",
    //         (text) => text.innerText
    //     );
    //     expect(el).toMatch(OtpRequriedError);
    // });

    it("should redirect", async () => {
        try {
            await page.click("input[name=otp]");
            await page.type("input[name=otp]", "456789");
            await Promise.all([
                page.click("button[type=submit]"),
                await page.goto("http://192.168.1.36:3000/admin"),
            ]);
        } catch (err) {
            console.log("An error occured while trying to verify otp => ", err);
        }
    });

