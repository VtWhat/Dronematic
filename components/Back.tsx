import Link from "next/link";
import {Button} from "@nextui-org/button";

export default function Back(){
    return(
        <Button 
        as={Link} 
        href='/home'
        color="default"
        variant="shadow"
        className="absolute top-24">
            <p>Voltar</p>
        </Button>
    )
}