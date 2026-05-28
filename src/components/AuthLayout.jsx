import { motion } from "framer-motion";

function AuthLayout({ children }) {

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center overflow-hidden relative">

      {/* Animated Circles */}

      <motion.div
        animate={{
          y:[0,-30,0]
        }}
        transition={{
          duration:5,
          repeat:Infinity
        }}
        className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-10 left-10"
      />

      <motion.div
        animate={{
          y:[0,40,0]
        }}
        transition={{
          duration:6,
          repeat:Infinity
        }}
        className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl bottom-10 right-10"
      />

      {/* Main Card */}

      <motion.div

        initial={{
          opacity:0,
          scale:0.9
        }}

        animate={{
          opacity:1,
          scale:1
        }}

        transition={{
          duration:0.5
        }}

        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl z-10"
      >

        {children}

      </motion.div>

    </div>
  );
}

export default AuthLayout;