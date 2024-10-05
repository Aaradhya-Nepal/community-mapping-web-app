import {GoogleMap} from "@react-google-maps/api";

type Props = {
    center: { lat: number, lng: number },
    zoom?: number,
    onClick?: any,
    children: any
}
export default function Map({
                                center,
                                zoom = 9,
                                onClick = undefined,
                                children,
                            }: Props) {
    return (
        <GoogleMap
            mapContainerStyle={{width: '100%', height: '500px', borderRadius: '0.4rem'}}
            center={center}
            zoom={zoom}
            onClick={onClick}
        >
            {children}
        </GoogleMap>
    )
}