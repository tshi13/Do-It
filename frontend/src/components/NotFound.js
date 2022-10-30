import '../styles/NotFound.css';
export default function lostPage() {
    return (
        <div>
            <div className="starsec-NF"></div>
            <div className="starthird-NF"></div>
            <div className="starfourth-NF"></div>
            <div className="starfifth-NF"></div>


            <div className="error__content-NF" style ={{justifyItems: 'center', marginRight: 'auto', marginLeft: 'auto'}}> 
                <div className="error__message message-NF">
                <h1 className="message__title-NF">Page Not Found</h1>
                <p className="message__text-NF">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists.</p>
                </div>
                <div className="error__nav-NF e-nav-NF">
                    <a href="/"  className="e-nav__link-NF"></a>
                </div>
            </div>
        </div>

    );
}
