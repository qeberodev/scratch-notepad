import "./App.css"
import React, {
    MutableRefObject,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react"
import { container, square } from "./application.css"
import { animated, useSpring } from "@react-spring/web"

type Animatable = {
    animate: () => void
}
const Square: React.FC<{
    api: MutableRefObject<Animatable | undefined>
}> = ({ api: apiRef }) => {
    const [state, setAnimationState] = useState(false)

    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
    }))
    const animatableApi = useMemo((): Animatable => {
        return {
            animate: () => {
                api.start({
                    from: {
                        x: 0,
                    },
                    to: {
                        x: 50,
                    },
                    reverse: state,
                })
                setAnimationState(!state)
            },
        }
    }, [api, state])

    apiRef.current = animatableApi

    return <animated.div className={square} style={springs} />
}

function App() {
    const apiRef = useRef<Animatable>()

    const handlePlay = useCallback(() => {
        apiRef.current?.animate()
    }, [apiRef])

    return (
        <div className={container}>
            <Square api={apiRef} />
            <button onClick={handlePlay}>Click to Hide/Show</button>
        </div>
    )
}

export default App
