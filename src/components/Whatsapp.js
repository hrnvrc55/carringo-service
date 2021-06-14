import WhatsAppIcon from '@material-ui/icons/WhatsApp';
export default function Whatsapp(){

    return (
        <div  className="whatsapp-icon">
            <a
                href="https://wa.me/+908503600705"
                className="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"

            >
                <WhatsAppIcon className="icon" />
            </a>
        </div>

    )
}
