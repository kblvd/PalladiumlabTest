let activeLink = null;
document.querySelectorAll('.mainNavigation a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const mainBackground = document.querySelector('.mainBackground');
        const newImage = this.getAttribute('data-image');
        const newBgc = this.getAttribute('data-bgc');
        const newText = this.getAttribute('data-text');
        const root = document.documentElement;
        const existingOverlay = document.querySelector('.linkOverlay');

        if (existingOverlay) {
            if (activeLink === this) {
                existingOverlay.style.top = `${window.innerHeight}px`; 
                mainBackground.style.backgroundImage = `url('../media/mainScreen1.png')`;
                mainBackground.style.height = '42%';
                setTimeout(() => {
                    existingOverlay.remove();
                }, 900);
                this.style.color = '';
                activeLink = null;
                root.style.setProperty('--header-text-color', '#646464');
                root.style.setProperty('--header-text-hover-color', '#000000');
                root.style.setProperty('--header-border-color', '#ebebeb');
                root.style.setProperty('--header-empry-color', '#ebebeb00');
                root.style.setProperty('--header-svg-fill', '#222222');
                root.style.setProperty('--header-svg-hover-fill', '#C6876D');
                return;
            } else {
                existingOverlay.remove();
            }
        }

        mainBackground.style.backgroundImage = `url(${newImage})`;
        mainBackground.style.height = '100%';

        activeLink = this;
        this.style.color = '#fff'; 

        const linkRect = this.getBoundingClientRect();
        const overlay = document.createElement('div');
        overlay.classList.add('linkOverlay');
        overlay.style.position = 'absolute';
        overlay.style.left = `${linkRect.left}px`;
        overlay.style.width = `${linkRect.width}px`;
        overlay.style.top = `${window.innerHeight}px`; 
        overlay.style.bottom = '86px';
        overlay.style.backgroundColor = newBgc;
        overlay.style.color = '#fff';
        overlay.style.overflow = 'hidden';
        overlay.style.transition = 'top 0.9s ease';
        overlay.style.zIndex = '9';
        overlay.style.pointerEvents = 'none';

        root.style.setProperty('--header-text-color', '#ffffffb2');
        root.style.setProperty('--header-text-hover-color', '#ffffff');
        root.style.setProperty('--header-border-color', '#ffffff4c');
        root.style.setProperty('--header-empry-color', '#ebebeb00');
        root.style.setProperty('--header-svg-fill', '#ffffff');
        root.style.setProperty('--header-svg-hover-fill', '#C6876D');
        
        overlay.innerHTML = `
            <div class="maneScreenPopUp">
                <div class="mainNavigation mainPopUpTitle">${this.getAttribute('data-original-text') || this.textContent}</div>
                <span>${newText}</span>
                <div class="mainArrow mainArrow_popUp">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_5501_39)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 0H8.75V8H14.2507L7.25 15.0007V0Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_5501_39">
                                <rect width="15" height="15" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => {
            overlay.style.top = '0';
        }, 10);
    });
});
