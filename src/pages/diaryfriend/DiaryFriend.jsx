import React from "react";
import { Shield, Headphones, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useLayoutEffect } from "react";

const DiaryFriend = () => {
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

  const options = [
    {
      title: "Privacy Policy",
      description: "View our privacy policy and data protection information",
      icon: Shield,
      path: "/diaryfriend/privacy",
      color: "cyan",
      gradient: "from-cyan-500/10 to-cyan-500/5",
      hoverGradient: "from-cyan-500/20 to-cyan-500/10",
      borderColor: "border-cyan-500/50",
      iconColor: "text-cyan-500",
    },
    {
      title: "App Support",
      description: "Get help and support for DiaryFriend app",
      icon: Headphones,
      path: "/diaryfriend/support",
      color: "purple",
      gradient: "from-purple-500/10 to-purple-500/5",
      hoverGradient: "from-purple-500/20 to-purple-500/10",
      borderColor: "border-purple-500/50",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-8">
      <div className="max-w-6xl w-full py-32">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-cyan-500 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full text-sm text-gray-400 mb-6">
            DiaryFriend
          </div>
          <h1 className="text-4xl lg:text-5xl font-light mb-4">
            What are you looking for?
          </h1>
          <p className="text-gray-500 text-lg">
            Choose the information you need
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {options.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.path}
                onClick={() => navigate(option.path)}
                className={`group relative overflow-hidden bg-gradient-to-br ${option.gradient} border border-gray-800 hover:${option.borderColor} rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-${option.color}-500/10`}
              >
                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-900/50 ${option.iconColor}`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-medium mb-3 text-white group-hover:text-white transition-colors">
                    {option.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center space-x-2 text-gray-500 group-hover:text-white transition-colors">
                    <span className="text-sm uppercase tracking-wider">
                      View Details
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 text-gray-600 text-sm">
          <p>DiaryFriend - Your Personal Diary Companion</p>
          <p className="mt-2">Developed by Jeong Hyun Lee</p>
        </div>
      </div>
    </div>
  );
};

export default DiaryFriend;
