export default function SwitchButton() {
    const check = (localStorage.getItem('theme') != 'light');
    if (check) {
        document.documentElement.style.setProperty('color-scheme', 'dark');
    }
    else {
        document.documentElement.style.setProperty('color-scheme', 'light');
    }
    return (
        <input id="switch-theme" type="checkbox" onClick={switchTheme} defaultChecked={check}></input>
    );
};

function switchTheme(e) {
	if (e.target.checked) {
        document.documentElement.style.setProperty('color-scheme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
	else {
        document.documentElement.style.setProperty('color-scheme', 'light');
        localStorage.setItem('theme', 'light');
	}
}