import '../styles/NotFound.css';
export default function lostPage() {
    return (
        <div>
            <div className="starsec"></div>
            <div className="starthird"></div>
            <div className="starfourth"></div>
            <div className="starfifth"></div>


            <div className="error__content" style ={{justifyItems: 'center', marginRight: 'auto', marginLeft: 'auto'}}> 
                <div className="error__message message">
                <h1 className="message__title">Page Not Found</h1>
                <p className="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists.</p>
                </div>
                <div className="error__nav e-nav">
                <a href="/" target="_blanck" className="e-nav__link"></a>
                </div>
            </div>
        </div>

    );
}
