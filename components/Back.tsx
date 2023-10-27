import Link from "next/link";
import {Button} from "@nextui-org/button";

export default function Back(){
    return(
        <Button 
        as={Link} 
        href='/home'
        color="default"
        variant="shadow"
        className="absolute top-8 left-8">
            <p>Voltar</p>
        </Button>
    )
}