
const ClearCompleted = ({ onClearCompleted }) => {
  return (
    <div className="flex justify-end mt-4 mb-2">
      <button
        onClick={onClearCompleted}
        className="
          text-sm text-slate-400 
          hover:text-slate-200 hover:bg-slate-800/80 
          transition-all duration-200 
          py-1.5 px-3 rounded-md
        "
      >
        Clear Completed
      </button>
    </div>
  )
}

export default ClearCompleted