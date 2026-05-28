import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon,
  color
}) {

  return (

    <motion.div

      whileHover={{
        scale:1.03
      }}

      className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-400">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}
        >

          {icon}

        </div>

      </div>

    </motion.div>
  );
}

export default StatCard;