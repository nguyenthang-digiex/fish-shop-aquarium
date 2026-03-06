import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiSmartphone } from 'react-icons/fi';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-deep via-[#071a26] to-deep px-6">
      <div className="grid w-full max-w-5xl rounded-lg bg-sand shadow-xl md:grid-cols-2">
        {/* LOGIN */}
        <div className="border-r border-slate-200 p-10">
          <h2 className="mb-6 text-2xl font-bold text-deep">ĐĂNG NHẬP</h2>

          {/* SOCIAL LOGIN */}

          <label className="mb-2 block text-sm font-medium text-deep">
            Tên tài khoản hoặc địa chỉ email *
          </label>

          <input
            type="text"
            className="mb-5 w-full rounded border border-slate-200 bg-slate-100 px-4 py-3"
          />

          <label className="mb-2 block text-sm font-medium text-deep">
            Mật khẩu *
          </label>

          <input
            type="password"
            className="mb-5 w-full rounded border border-slate-200 bg-slate-100 px-4 py-3"
          />

          <div className="mb-6 flex items-center gap-2 text-sm text-deep">
            <input type="checkbox" />
            <span>Ghi nhớ mật khẩu</span>
          </div>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t"></div>
            <span className="px-4 text-sm text-gray-500">hoặc</span>
            <div className="flex-1 border-t"></div>
          </div>

          <div className="mb-6 flex justify-center gap-6">
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 hover:bg-blue-50">
              <FaFacebookF />
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100">
              <FcGoogle />
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100">
              <FiSmartphone />
            </button>
          </div>

          <button className="rounded bg-ocean px-6 py-3 font-semibold text-white transition hover:bg-600">
            ĐĂNG NHẬP
          </button>

          <p className="mt-6 cursor-pointer text-sm text-aqua hover:text-ocean">
            Quên mật khẩu?
          </p>
        </div>

        {/* REGISTER */}
        <div className="p-10">
          <h2 className="mb-6 text-2xl font-bold text-deep">ĐĂNG KÝ</h2>

          {/* SOCIAL REGISTER */}
          <label className="mb-2 block text-sm font-medium text-deep">
            Địa chỉ email *
          </label>

          <input
            type="email"
            className="mb-5 w-full rounded border border-slate-200 bg-slate-100 px-4 py-3"
          />

          <label className="mb-2 block text-sm font-medium text-deep">
            Mật khẩu *
          </label>

          <input
            type="password"
            className="mb-5 w-full rounded border border-slate-200 bg-slate-100 px-4 py-3"
          />

          <label className="mb-2 block text-sm font-medium text-deep">
            Xác nhận mật khẩu *
          </label>

          <input
            type="password"
            className="mb-5 w-full rounded border border-slate-200 bg-slate-100 px-4 py-3"
          />

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t"></div>
            <span className="px-4 text-sm text-gray-500">hoặc</span>
            <div className="flex-1 border-t"></div>
          </div>

          <div className="mb-6 flex justify-center gap-6">
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 hover:bg-blue-50">
              <FaFacebookF />
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100">
              <FcGoogle />
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100">
              <FiSmartphone />
            </button>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-slate-500">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our chính sách riêng tư.
          </p>

          <button className="rounded bg-ocean px-6 py-3 font-semibold text-white transition hover:bg-600">
            ĐĂNG KÝ
          </button>
        </div>
      </div>
    </div>
  );
}
