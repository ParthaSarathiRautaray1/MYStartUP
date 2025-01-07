document.addEventListener("DOMContentLoaded", () => {
    // DOM Variables
    const nameInput = document.getElementById("name_input");
    const emailInput = document.getElementById("email_input");
    const interestInput = document.getElementById("interest_input");
    const nameInputError = document.getElementById("name_input_error");
    const emailInputError = document.getElementById("email_input_error");
    const interestInputError = document.getElementById("interest_input_error");
    const contactUsForm = document.getElementById("contact_us_form");
    const hamburgerIcon = document.getElementById("hamburger_icon");
    const mobileNav = document.getElementById("mobile_nav");

    // Banners Auto Slider
    const bannerDisplayer = document.getElementById("banner_displayer");
    const banners = document.getElementsByClassName("banner");

    const totalBanners = banners.length;
    let currentBannerIndex = 0;


    // HAMBURGER ICON Navigation
    hamburgerIcon.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    // Banners Auto Slider Function
    let moveDirection = "right";
    let moveToNextBanner = () => {
        if (currentBannerIndex === (totalBanners - 1)) {
            moveDirection = "left";
        } else if (currentBannerIndex === 0) {
            moveDirection = "right";
        }

        if (moveDirection === "right") {
            currentBannerIndex++;
        } else if (moveDirection === "left") {
            currentBannerIndex--;
        }

        const offset = -currentBannerIndex * 100;

        // Move Banner Displayer
        bannerDisplayer.style.transform = `translateX(${offset}%)`;
    }

    setInterval(moveToNextBanner, 3000);

    // Input Validations
    let validateInput = () => {
        let isValid = true;

        // Name Validation
        if (nameInput.value.trim() === "") {
            nameInput.classList.add("error");
            nameInputError.classList.add("show-error");
            isValid = false;
        } else {
            nameInput.classList.remove("error");
            nameInputError.classList.remove("show-error");
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add("error");
            emailInputError.classList.add("show-error");
            isValid = false;
        } else {
            emailInput.classList.remove("error");
            emailInputError.classList.remove("show-error");
        }

        // Interest Validation
        if (interestInput.value.trim() === "") {
            interestInput.classList.add("error");
            interestInputError.classList.add("show-error");
            isValid = false;
        } else {
            interestInput.classList.remove("error");
            interestInputError.classList.add("show-error");
        }

        return isValid;
    }



    function showToast(message, isError = false) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'error' : ''}`;
        toast.textContent = message;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    contactUsForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        if (!validateInput()) {
            return;
        }
    
        const formData = new FormData(contactUsForm);
        
        try {
            const response = await fetch(contactUsForm.action, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showToast('Thank you for contacting us!');
                contactUsForm.reset();
            } else {
                showToast('Something went wrong. Please try again.', true);
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Something went wrong. Please try again.', true);
        }
    });
    
});

// About Image Slider
const aboutImageSlider = document.getElementById("about_image_slider");
const totalAboutImages = aboutImageSlider.children.length;
let currentAboutImage = 0;

function rotateAboutImages() {
    currentAboutImage = (currentAboutImage + 1) % totalAboutImages;
    aboutImageSlider.style.transform = `translateX(-${currentAboutImage * 100}%)`;
}

setInterval(rotateAboutImages, 3000);
