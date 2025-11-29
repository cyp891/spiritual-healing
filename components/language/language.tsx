"use client"

export default function Language() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8 gap-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-slate-900 mb-2">Language Support</h1>
        <p className="text-lg text-slate-600">We speak multiple languages</p>
      </div>

      {/* Main Icon Section */}
      {/* <div className="bg-white rounded-3xl p-16 shadow-2xl">
        <GirlWithHeadset />
      </div> */}

      {/* Features Section  */}
       <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full max-w-6xl">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl mb-2">🇩🇪</div>
          <h3 className="text-lg font-semibold text-slate-900">German</h3>
          <p className="text-sm text-slate-600">Deutsch</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl mb-2">🇬🇷</div>
          <h3 className="text-lg font-semibold text-slate-900">Greek</h3>
          <p className="text-sm text-slate-600">Ελληνικά</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl mb-2">🇷🇺</div>
          <h3 className="text-lg font-semibold text-slate-900">Russian</h3>
          <p className="text-sm text-slate-600">Русский</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl mb-2">🇺🇦</div>
          <h3 className="text-lg font-semibold text-slate-900">Ukrainian</h3>
          <p className="text-sm text-slate-600">Українська</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl mb-2">🇬🇧</div>
          <h3 className="text-lg font-semibold text-slate-900">English</h3>
          <p className="text-sm text-slate-600">English</p>
        </div>
      </div>
    </main>
  )
}