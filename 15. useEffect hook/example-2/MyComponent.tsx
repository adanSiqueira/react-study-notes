import { useState, useEffect} from "react";

function MyComponent() {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    function handleResize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        console.log("Event Listener Added");

        return () => {
            window.removeEventListener('resize', handleResize);
            console.log("Event Listener Removed");
        }
    }, []);

    useEffect(() =>{
        document.title = `Size: ${width} x ${height}`;
    }, [width, height]);

    return(
        <>
        <p>Window Width: {width} px </p>
        <p>Window Height: {height} px </p>

        </>
        
    )
}

export default MyComponent;