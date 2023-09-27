import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function TermsConditions() {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-black text-black dark:text-white flex flex-col items-center">
        <section className="mt-10 flex flex-col px-10 w-full lg:w-2/3">
          <div className="flex flex-col border-2 mb-5 dark:border-primary border-secondary rounded-xl px-7 py-7 text-justify max-h-[450px] overflow-y-auto">
            <h1 className="font-heading mb-3 text-lg">Terms and Conditions</h1>
            <p className="mb-4 px-5">Effective Date: 01.09.2023</p>
            
            <h1 className="font-heading mb-2">1. Acceptance of Terms</h1>
            <p className="mb-2 px-5">
              By accessing or using sleepyLog ("the App"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, please do not use the App.
            </p>
            <p className="mb-2 px-5">
              1.1. License: sleepyLog grants you a limited, non-exclusive, non-transferable, revocable license to use the App for your personal, non-commercial use, subject to these Terms and Conditions.
            </p>
            
            <h1 className="font-heading mb-2">2. Use of the App</h1>
            <p className="mb-2 px-5">
              2.1. User Accounts: To use certain features of the App, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            
            <h1 className="font-heading mb-2">3. Privacy</h1>
            <p className="mb-2 px-5">
              3.1. Data Collection: The App may collect and store data related to your sleep patterns and health. sleepyLog will handle this data in accordance with its Privacy Policy, which you can review separately.
            </p>
            <p className="mb-2 px-5">
              3.2. User Data: You grant sleepyLog permission to use your sleep-related data for research, analysis, and improvement of the App, provided that such data is anonymized and does not personally identify you.
            </p>
            
            <h1 className="font-heading mb-2">4. Content</h1>
            <p className="mb-2 px-5"> 
              4.1. Ownership: All content, including text, graphics, images, and other materials, made available through the App are the property of sleepyLog or its licensors and are protected by intellectual property laws.
            </p>
            <p className="mb-2 px-5">
              4.2. Restrictions: You may not reproduce, distribute, modify, or create derivative works from any content on the App without prior written consent from sleepyLog.
            </p>
            
            <h1 className="font-heading mb-2">5. User Conduct</h1>
            <p className="mb-1 px-5">
              5.1. Prohibited Activities: You agree not to engage in any of the following activities:
            </p>
            <ul className="mb-2 px-10">
              <li>a. Using the App for any unlawful purpose.</li>
              <li>b. Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
              <li>c. Uploading or transmitting viruses, malware, or other malicious code.</li>
              <li>d. Interfering with or disrupting the App or its servers.</li>
            </ul>
            
            <h1 className="font-heading mb-2">6. Disclaimer of Warranties</h1>
            <p className="mb-2 px-5">
              6.1. The App is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to, warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            
            <h1 className="font-heading mb-2">7. Limitation of Liability</h1>
            <p className="mb-2 px-5">
              7.1. To the fullest extent permitted by applicable law, sleepyLog shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
            
            <h1 className="font-heading mb-2">8. Termination</h1>
            <p className="mb-2 px-5">
              8.1. sleepyLog reserves the right to suspend or terminate your access to the App at any time, with or without cause and with or without notice.
            </p>
            
            <h1 className="font-heading mb-2">9. Governing Law</h1>
            <p className="mb-2 px-5">
              9.1. These Terms and Conditions shall be governed by and construed in accordance with the laws of France.
            </p>
            
            <h1 className="font-heading mb-2">10. Contact Information</h1>
            <p className="mb-2 px-5">
              10.1. If you have any questions or concerns about these Terms and Conditions, please contact us at: sleepylog.kz@gmail.com.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TermsConditions;
