import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PageNavigator({ totalPage }) {
    const [showPopupBox, setShowPopupBox] = useState();
    const { search, pathname } = useLocation();
    const elementRef = useRef(null);
    const navigate = new useNavigate();
    const params = new URLSearchParams(search)
    const page = Math.max(Number(params.get('page')), 1);

    const hideWhenOutfocus = (e) => {
        if (elementRef.current && !elementRef.current.contains(e.target)) {
            setShowPopupBox(undefined);
        }
    };

    const goToPage = (e) => {
        const content = e.currentTarget.innerText;
        if (content == '...') {
            const rect = e.currentTarget.getBoundingClientRect();
            setShowPopupBox({
                display: 'flex',
                left: `${rect.left + window.scrollX}px`,
                top: `${rect.top + window.scrollY + e.target.offsetHeight + 10}px`
            });
        }
        else {
            let newPage;
            if (e.currentTarget.nodeName == 'FORM') {
                e.preventDefault();
                newPage = Number(e.target.lastChild.value);
                e.target.lastChild.value = '';
            }
            else if (content == 'Next') {
                newPage = page + 1;
            }
            else if (content == 'Prev') {
                newPage = page - 1;
            }
            else {
                newPage = Number(content);
            }
            
            if (0 < newPage && newPage <= totalPage && newPage != page) {
                params.set('page', newPage);
                navigate(pathname + '?' + params.toString());
                setShowPopupBox(undefined);
            }
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', hideWhenOutfocus);
        return () => {
            document.removeEventListener('mousedown', hideWhenOutfocus);
        };
    }, [showPopupBox]);

    const buttons = [];
    if (totalPage > 1) {
        for (let i = 0; i < Math.min(7, totalPage) + 2; i++) {
            if (i == 0) {
                buttons.push(
                    <button key={i} disabled={page == 1} onClick={goToPage}>Prev</button>
                );
            }
            else if (i == Math.min(7, totalPage) + 2 - 1) {
                buttons.push(
                    <button key={i} disabled={page == totalPage} onClick={goToPage}>Next</button>
                );
            }
            else {
                let content = '';
                if (i == 1) {
                    content = 1;
                }
                else if (i == Math.min(totalPage, 7)) {
                    content = totalPage;
                }
                else if (totalPage < 8) {
                    content = i;
                }
                else {
                    if (page < 5) {
                        if (i <= 5) {
                            content = i;
                        }
                        else {
                            content = '...';
                        }
                    }
                    else if (page > totalPage - 4) {
                        if (i >= 3) {
                            content = i + totalPage - 7;
                        }
                        else {
                            content = '...';
                        }
                    }
                    else {
                        switch (i) {
                            case 3:
                                content = page - 1;
                                break;
                            case 4:
                                content = page;
                                break;
                            case 5:
                                content = page + 1;
                                break;
                            default:
                                content = '...';
                        }
                    }
                }
                buttons.push(
                    <button key={i} id={content == page ? 'cur-page' : ''} onClick={goToPage}>{content}</button>
                );
            }
        }
    }
    
    return <>
        <div id="page-nav">{buttons}</div>
        <form id="popup-box" ref={elementRef} style={showPopupBox} onSubmit={goToPage}>
            <label htmlFor="page">Go to page:</label>
            <input type="text" id="page" minLength="1" maxLength="4" size="4" pattern="[1-9][0-9]*"></input>
        </form>
    </>;
};