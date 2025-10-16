import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useLayoutEffect } from "react";

const DiaryFriendPrivacy = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // 해시(#section) 이동이면 유지하고, 그 외엔 0으로
    if (!hash) {
      // Safari 호환: 문서 요소가 없는 경우 대비
      const scrollTarget =
        document.scrollingElement || document.documentElement;
      scrollTarget.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-8 pt-32 pb-8">
        <button
          onClick={() => navigate("/diaryfriend")}
          className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-cyan-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to DiaryFriend</span>
        </button>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-8 pb-12 border-b border-gray-800">
        <div className="inline-block px-4 py-1 bg-cyan-500/10 rounded-full text-cyan-500 text-xs uppercase tracking-wider mb-6">
          Legal Document
        </div>
        <h1 className="text-4xl lg:text-5xl font-light mb-4">
          Privacy Policy for DiaryFriend
        </h1>
        <p className="text-gray-500">
          <span className="font-medium text-gray-400">Effective Date:</span>{" "}
          {today}
        </p>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="prose prose-invert prose-cyan max-w-none">
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              1. Introduction
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Welcome to DiaryFriend, developed by Jeong Hyun Lee ("we", "our",
              or "us"). This Privacy Policy explains how we collect, use, and
              protect your personal information when you use our iOS
              application.
            </p>
            <p className="text-gray-400 leading-relaxed">
              By using DiaryFriend, you agree to the terms described in this
              policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              2. Information We Collect
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We may collect the following types of information:
            </p>
            <ul className="space-y-3 text-gray-400 ml-6">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span>
                  <strong className="text-gray-300">
                    Personal Information:
                  </strong>{" "}
                  Your name, email address, and profile photo (collected during
                  Google or Apple login).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span>
                  <strong className="text-gray-300">
                    User-Generated Content:
                  </strong>{" "}
                  Diary entries, including text and images, that you voluntarily
                  create and upload within the app.
                </span>
              </li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              This information is collected solely for app functionality,
              including authentication, content creation, and synchronization.
              We do not sell, share, or use your data for marketing or
              advertising purposes.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              3. How We Collect Information
            </h2>
            <ul className="space-y-3 text-gray-400 ml-6">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span>
                  When you sign in using Apple Login or Google Login, we receive
                  basic account information (name, email, profile image).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span>
                  When you create or edit diary entries, we collect the data you
                  provide voluntarily.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              4. Third-Party Services
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We use the following third-party services to operate the app
              securely and efficiently:
            </p>
            <ul className="space-y-3 text-gray-400 ml-6">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span>
                  <strong className="text-gray-300">Supabase</strong> – For
                  authentication, secure database storage, and synchronization.
                  Supabase acts solely as a data processor and does not access
                  or use your data for any other purpose.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span>
                  <strong className="text-gray-300">OpenAI API</strong> – For AI
                  character conversations and diary suggestions. Only the text
                  input necessary to generate responses is processed.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-3 mt-1">•</span>
                <span>
                  <strong className="text-gray-300">
                    Apple Login & Google Login
                  </strong>{" "}
                  – For secure user authentication and identity verification.
                </span>
              </li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              These third parties may process your information only to provide
              their respective services and are bound by their own privacy
              policies.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              5. Local Data and Cache
            </h2>
            <p className="text-gray-400 leading-relaxed">
              DiaryFriend uses a local database (Realm) on your device to
              temporarily store diary entries for offline access and performance
              optimization. All cached data remains on your device and is
              deleted automatically when the app is uninstalled.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              6. User Rights
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              You can view, edit, and delete your diary entries or account
              information at any time directly within the app. If you delete
              your account, all related data stored in Supabase will be
              permanently removed and cannot be recovered.
            </p>
            <p className="text-gray-400 leading-relaxed">
              To make further privacy inquiries, you may contact us at{" "}
              <a
                href="mailto:lejhn1@gmail.com"
                className="text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                lejhn1@gmail.com
              </a>
              .
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              7. Data Security
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We take reasonable security measures to protect your personal data
              from unauthorized access, alteration, or disclosure. All data
              transmissions between the app and Supabase are encrypted via
              HTTPS.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              8. Children's Privacy
            </h2>
            <p className="text-gray-400 leading-relaxed">
              DiaryFriend is intended for users of all ages. We do not knowingly
              collect personal information from children under 13. If you
              believe that a child has provided us with personal data, please
              contact us, and we will promptly delete it.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              9. Legal Basis and Jurisdiction
            </h2>
            <p className="text-gray-400 leading-relaxed">
              This Privacy Policy is governed by the privacy laws of the United
              States (CCPA). For users outside the United States, we strive to
              comply with applicable international privacy standards, including
              GDPR (EU) and PIPA (Korea).
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              10. Changes to This Policy
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on the same web link, and the "Effective Date" will
              be updated accordingly.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-white">
              11. Contact Us
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy,
              please contact:
            </p>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-500" />
                  <span className="text-gray-400">Email:</span>
                  <a
                    href="mailto:lejhn1@gmail.com"
                    className="text-cyan-500 hover:text-cyan-400 transition-colors"
                  >
                    lejhn1@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 ml-8">Developer:</span>
                  <span className="text-white">Jeong Hyun Lee</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-8">
        <div className="max-w-4xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2025 DiaryFriend by Jeong Hyun Lee. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DiaryFriendPrivacy;
