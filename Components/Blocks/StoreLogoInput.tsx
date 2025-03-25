import { FormBlock } from "../UI/Form/FromBlock";
import { Label } from "../UI/Form/Label";

type Props = {
    logo:string | undefined
}
export default function StoreLogoInput({logo}:Props) {
    // https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
    // https://stackoverflow.com/questions/8727202/size-resolution-and-quality-recommendation-for-images
    return (
        <FormBlock>
            <Label htmlFor="logo">شعار المتجر:</Label>
            <input name="logo" type="file" accept="image/*"/>
            {/* TODO: add image to show the logo, create validate to check the size*/}
        </FormBlock>
    )
}

