document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach((span, i) => {
            if (navLinks.classList.contains('active')) {
                if (i === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                if (i === 1) span.style.opacity = '0';
                if (i === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });

    // 滚动效果
    const header = document.querySelector('.header');
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    function handleScroll() {
        // 导航栏效果
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '';
        }

        // 技能条动画
        if (!skillsAnimated) {
            const skillsSection = document.querySelector('#skills');
            if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight - 150) {
                skillBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-progress') + '%';
                });
                skillsAnimated = true;
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                navLinks.classList.remove('active');
                menuToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    });

    // 表单提交
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('表单提交:', {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        });

        notification.querySelector('p').textContent = '消息已发送成功！我会尽快回复您。';
        notification.classList.add('show');
        contactForm.reset();

        setTimeout(() => notification.classList.remove('show'), 3000);
    });

    // 作品集链接
    document.querySelectorAll('.portfolio-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.closest('.portfolio-overlay').querySelector('h3').textContent;
            notification.querySelector('p').textContent = `正在加载 "${title}" 的详细信息...`;
            notification.classList.add('show');
            setTimeout(() => notification.classList.remove('show'), 3000);
        });
    });
});