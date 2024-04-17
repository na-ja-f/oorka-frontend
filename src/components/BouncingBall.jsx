function BouncingBall() {
    return (
        <div className="hidden relative lg:flex w-1/2 h-full items-center justify-center bg-slate-100">
            <div className="w-96 h-96 bg-gradient-to-tr from-purple-950 to-violet-800 rounded-full animate-bounce" />
            <div className="w-full h-1/2 absolute -bottom-5 bg-white/10 backdrop-blur-xl" />
        </div>
    )
}

export default BouncingBall
