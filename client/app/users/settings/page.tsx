import Image from "next/image";
import SettingsForm from "./components/settings_form";

const SettingsPage = () => {
    return (
        <main className="min-h-screen min-w-screen p-12 overflow-hidden">
            <SettingsForm/>
        </main>
    );
}

export default SettingsPage;
