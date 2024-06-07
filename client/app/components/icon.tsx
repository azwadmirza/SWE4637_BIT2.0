"use client";
import { IonIcon } from "@ionic/react";


interface IIcon{
    type:string | undefined;
    className:string;
}


const Icon = ({type,className}:IIcon) => {
    return ( 
    <IonIcon icon={type} className={className}>
    </IonIcon> );
}
 
export default Icon;