import React from "react";
import { Mail, ArrowLeft, MessageCircle, Bug, HelpCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useLayoutEffect } from "react";

const DiaryFriendSupport = () => {
  const navigate = useNavigate();

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
          className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-purple-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to DiaryFriend</span>
        </button>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-8 pb-12 border-b border-gray-800">
        <div className="inline-block px-4 py-1 bg-purple-500/10 rounded-full text-purple-500 text-xs uppercase tracking-wider mb-6">
          App Support
        </div>
        <h1 className="text-4xl lg:text-5xl font-light mb-4">
          DiaryFriend Support
        </h1>
        <p className="text-gray-500 text-lg">
          We're here to help you with any questions or issues
        </p>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-8 py-16">
        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium mb-6 text-white">Get in Touch</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            If you're experiencing any issues with DiaryFriend or have questions
            about the app, we're here to help. Please don't hesitate to reach
            out to us.
          </p>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Email Support</h3>
                <p className="text-gray-400 mb-4">
                  For support inquiries, please email us at:
                </p>
                <a
                  href="mailto:lejhn1@gmail.com"
                  className="text-purple-500 hover:text-purple-400 transition-colors text-lg"
                >
                  lejhn1@gmail.com
                </a>
                <p className="text-gray-500 text-sm mt-4">
                  We typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium mb-6 text-white">
            Common Issues
          </h2>
          <div className="space-y-6">
            {/* Issue 1 */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Login or Authentication Issues
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    If you're having trouble signing in with Apple or Google,
                    try logging out and back in. Make sure you're using the same
                    account you originally signed up with. If the problem
                    persists, please contact us.
                  </p>
                </div>
              </div>
            </div>

            {/* Issue 2 */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Bug className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Data Sync Problems
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    If your diary entries aren't syncing across devices, check
                    your internet connection and make sure you're logged into
                    the same account on all devices. Try force-closing and
                    reopening the app.
                  </p>
                </div>
              </div>
            </div>

            {/* Issue 3 */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    AI Character Not Responding
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    If the AI character isn't responding to your messages,
                    please check your internet connection. The AI feature
                    requires an active internet connection to work. If you
                    continue to experience issues, please contact support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account Management */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium mb-6 text-white">
            Account Management
          </h2>
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Deleting Your Account</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              You can delete your account and all associated data directly
              within the app:
            </p>
            <ol className="space-y-2 text-gray-400 ml-6">
              <li className="flex items-start">
                <span className="text-purple-500 mr-3">1.</span>
                <span>Open the DiaryFriend app</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3">2.</span>
                <span>Go to Settings</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3">3.</span>
                <span>Tap "Account"</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3">4.</span>
                <span>Select "Delete Account"</span>
              </li>
            </ol>
            <p className="text-gray-500 text-sm mt-4">
              Note: This action is permanent and cannot be undone. All your
              diary entries will be permanently deleted.
            </p>
          </div>
        </section>

        {/* Additional Support */}
        <section>
          <h2 className="text-2xl font-medium mb-6 text-white">
            Need More Help?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            If you didn't find what you were looking for, or if you're
            experiencing a different issue, please don't hesitate to contact us
            directly:
          </p>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-gray-800 rounded-lg p-8 text-center">
            <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Contact Support</h3>
            <p className="text-gray-400 mb-4">
              Email us with your questions or concerns
            </p>
            <a
              href="mailto:lejhn1@gmail.com"
              className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Send Email
            </a>
          </div>
        </section>

        {/* Developer Info */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              <strong className="text-gray-500">Developer:</strong> Jeong Hyun
              Lee
            </p>
            <p>
              <strong className="text-gray-500">Email:</strong>{" "}
              <a
                href="mailto:lejhn1@gmail.com"
                className="text-purple-500 hover:text-purple-400 transition-colors"
              >
                lejhn1@gmail.com
              </a>
            </p>
          </div>
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

export default DiaryFriendSupport;
