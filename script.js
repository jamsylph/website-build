document.addEventListener('DOMContentLoaded', () => {
    // 更新年份
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // 标记JS已加载，移除初始强制样式
    document.body.classList.add('js-loaded');
    
    // 移除 light-theme 类，确保始终使用黑夜模式
    document.body.classList.remove('light-theme');
    
    // 初始化语言
    const currentLang = localStorage.getItem('language') || 'en';
    switchLanguage(currentLang);
    
    // 语言切换
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
            
            // 更新按钮状态
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 保存语言偏好
            localStorage.setItem('language', lang);
        });
    });
    
    // 个性圆圈交互
    const personaCircles = document.querySelectorAll('.persona-circle');
    personaCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            // 移除所有圆圈的活动状态
            personaCircles.forEach(c => c.classList.remove('active'));
            // 给当前点击的圆圈添加活动状态
            circle.classList.add('active');
            
            // 获取要显示的内容ID
            const personaType = circle.getAttribute('data-persona');
            const contentId = `${personaType}-content`;
            
            // 隐藏所有内容，显示选中的内容
            document.querySelectorAll('.persona-item').forEach(item => {
                item.classList.remove('active');
            });
            document.getElementById(contentId).classList.add('active');
        });
    });
    
    // 主题切换功能已移除
    
    // 滚动动画
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 初始化3D地球
    initGlobe();
    
    // 更新导航链接
    updateActiveNavLink();
    
    // Initialize knowledge tree
    initKnowledgeTree();
    
    // Setup portfolio tabs functionality
    setupPortfolioTabs();
    
    // 初始滚动动画
    setTimeout(revealOnScroll, 300);
    
    // 滚动事件监听器
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        revealOnScroll();
        toggleBackToTopButton();
    });
    
    // 确保Core Strengths部分立即显示
    document.querySelectorAll('.strength-item').forEach(item => {
        item.classList.add('fade-in');
    });
    
    // 调试输出
    console.log('Core Strengths检查:');
    console.log('- 强度项目总数:', document.querySelectorAll('.strength-item').length);
    console.log('- 已渲染的项目数:', document.querySelectorAll('.strength-item.fade-in').length);
    document.querySelectorAll('.strength-item').forEach((item, index) => {
        console.log(`- 项目 ${index+1}:`, {
            opacity: window.getComputedStyle(item).opacity,
            transform: window.getComputedStyle(item).transform,
            display: window.getComputedStyle(item).display,
            visibility: window.getComputedStyle(item).visibility
        });
    });

    // 初始化项目轮播
    initProjectCarousel();
    
    // 初始化作品集轮播
    initPortfolioCarousel();
    
    // 初始化返回顶部按钮
    initBackToTop();
    
    // Initialize the skills knowledge graph
    initSkillsKnowledgeGraph();
    
    // Adjust SVG viewBox when window resizes
    window.addEventListener('resize', () => {
        adjustSkillsSVGViewBox();
    });
    
    // Initial adjustment of SVG viewBox
    adjustSkillsSVGViewBox();
});

// 语言切换函数
function switchLanguage(lang) {
    // 更新所有带有data-en和data-zh属性的元素
    const elements = document.querySelectorAll('[data-en][data-zh]');
    elements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // 更新输入框占位符
    const inputs = document.querySelectorAll('input[data-en-placeholder][data-zh-placeholder]');
    inputs.forEach(input => {
        input.placeholder = input.getAttribute(`data-${lang}-placeholder`);
    });
    
    // 更新HTML语言
    document.documentElement.lang = lang;
    
    // 更新页面标题
    document.title = lang === 'en' ? 'Cyber Space | Algorithm Engineer' : '赛博空间 | 算法工程师';
}

// 3D地球动画
function initGlobe() {
    const canvas = document.getElementById('globe');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff2a6d, 1);
    pointLight.position.set(15, 15, 15);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x05d9e8, 1);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);
    
    // 始终使用黑夜模式的配色
    const globeWireColor = 0x05d9e8; // 暗色主题蓝色
    const particleColor = 0x05d9e8; // 暗色主题蓝色
    
    // 创建地球
    const globeGeometry = new THREE.SphereGeometry(5, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
        color: globeWireColor,
        metalness: 0.9,
        roughness: 0.5,
        wireframe: true
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // 保存对globe的引用
    window.globe = globe;
    
    // 添加粒子效果
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: particleColor
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // 保存对粒子的引用
    window.globeParticles = particlesMesh;
    
    camera.position.z = 15;
    
    // 动画
    function animate() {
        requestAnimationFrame(animate);
        
        globe.rotation.x += 0.002;
        globe.rotation.y += 0.003;
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // 响应式调整
    window.addEventListener('resize', () => {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    });
}

// 添加滚动显示效果
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .metric');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.9) {
            element.classList.add('fade-in');
        }
    });
});

// Setup language switching
function initLanguage() {
    // Set initial language to English (default)
    document.documentElement.lang = 'en';
    
    // Get language buttons
    const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
    const zhBtn = document.querySelector('.lang-btn[data-lang="zh"]');
    
    // Set initial active state
    if (enBtn) enBtn.classList.add('active');
    
    // Add event listeners to language buttons
    if (enBtn) {
        enBtn.addEventListener('click', function() {
            switchLanguage('en');
            enBtn.classList.add('active');
            if (zhBtn) zhBtn.classList.remove('active');
        });
    }
    
    if (zhBtn) {
        zhBtn.addEventListener('click', function() {
            switchLanguage('zh');
            zhBtn.classList.add('active');
            if (enBtn) enBtn.classList.remove('active');
        });
    }
}

// Setup portfolio tabs functionality
function setupPortfolioTabs() {
    const tabs = document.querySelectorAll('.portfolio-toggle .portfolio-tab');
    
    console.log('Portfolio Tabs Setup:');
    console.log('- Tabs found:', tabs.length);
    
    if (tabs.length === 0) {
        console.log('Portfolio tabs not found');
        return;
    }
    
    // 设置初始状态 - 所有标签中只有"All"是激活的
    tabs.forEach(tab => {
        if (tab.getAttribute('data-target') === 'all') {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
        
        // 为每个标签添加点击事件
        tab.addEventListener('click', (e) => {
            const category = tab.getAttribute('data-target');
            console.log('Portfolio tab clicked:', category);
            
            // 阻止默认行为和事件冒泡
            e.preventDefault();
            e.stopPropagation();
            
            // 更新标签激活状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 过滤轮播幻灯片
            filterPortfolioSlides(category);
        });
    });
}

// 过滤轮播幻灯片
function filterPortfolioSlides(category) {
    const slides = document.querySelectorAll('.portfolio-slide');
    console.log(`Filtering portfolio slides for category: ${category}`);
    
    if (slides.length === 0) {
        console.warn('Portfolio slides not found');
        return;
    }
    
    // 使用data-category属性筛选幻灯片
    let hasActive = false;
    let firstMatchingSlide = null;
    
    slides.forEach(slide => {
        const slideCategory = slide.getAttribute('data-category') || '';
        const categoryArray = slideCategory.split(' ');
        
        const shouldShow = category === 'all' || categoryArray.includes(category);
        
        if (shouldShow) {
            slide.style.display = '';
            if (!firstMatchingSlide) {
                firstMatchingSlide = slide;
            }
        } else {
            slide.style.display = 'none';
            slide.classList.remove('active');
        }
    });
    
    // 至少激活一个匹配的幻灯片
    if (firstMatchingSlide) {
        slides.forEach(s => s.classList.remove('active'));
        firstMatchingSlide.classList.add('active');
        
        // 更新指示器
        const indicators = document.querySelectorAll('.portfolio-indicator');
        if (indicators.length > 0) {
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[0].classList.add('active');
        }
    }
    
    console.log('Portfolio filtering complete');
}

// 初始化作品集轮播
function initPortfolioCarousel() {
    console.log('Initializing portfolio carousel...');
    
    const slides = document.querySelectorAll('.portfolio-slide');
    const prevButton = document.querySelector('.portfolio-controls .prev-button');
    const nextButton = document.querySelector('.portfolio-controls .next-button');
    const indicators = document.querySelectorAll('.portfolio-indicator');
    
    if (slides.length === 0) {
        console.warn('Portfolio slides not found');
        return;
    }
    
    console.log(`Found ${slides.length} portfolio slides`);
    
    // 设置初始状态
    if (!document.querySelector('.portfolio-slide.active') && slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    // 自动轮播变量
    let portfolioAutoplayInterval = null;
    const autoplayDelay = 5000; // 5秒切换一次
    
    // 自动轮播函数
    function startPortfolioAutoplay() {
        stopPortfolioAutoplay(); // 先停止当前的自动播放
        
        portfolioAutoplayInterval = setInterval(() => {
            const activeSlide = document.querySelector('.portfolio-slide.active');
            const visibleSlides = Array.from(slides).filter(slide => 
                window.getComputedStyle(slide).display !== 'none');
            
            if (!activeSlide || visibleSlides.length === 0) return;
            
            const activeIndex = visibleSlides.indexOf(activeSlide);
            const nextIndex = (activeIndex + 1) % visibleSlides.length;
            
            // 找到可见幻灯片的索引并导航到它
            goToPortfolioSlide(Array.from(slides).indexOf(visibleSlides[nextIndex]));
        }, autoplayDelay);
    }
    
    // 停止自动轮播
    function stopPortfolioAutoplay() {
        if (portfolioAutoplayInterval) {
            clearInterval(portfolioAutoplayInterval);
            portfolioAutoplayInterval = null;
        }
    }
    
    // 点击指示器导航到对应幻灯片
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToPortfolioSlide(index);
            // 重置自动轮播计时器
            startPortfolioAutoplay();
        });
    });
    
    // 添加前进/后退按钮事件
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const activeSlide = document.querySelector('.portfolio-slide.active');
            const visibleSlides = Array.from(slides).filter(slide => 
                window.getComputedStyle(slide).display !== 'none');
            
            if (!activeSlide || visibleSlides.length === 0) return;
            
            const activeIndex = visibleSlides.indexOf(activeSlide);
            const prevIndex = (activeIndex - 1 + visibleSlides.length) % visibleSlides.length;
            
            // 找到可见幻灯片的索引并导航到它
            goToPortfolioSlide(Array.from(slides).indexOf(visibleSlides[prevIndex]));
            
            // 重置自动轮播计时器
            startPortfolioAutoplay();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const activeSlide = document.querySelector('.portfolio-slide.active');
            const visibleSlides = Array.from(slides).filter(slide => 
                window.getComputedStyle(slide).display !== 'none');
            
            if (!activeSlide || visibleSlides.length === 0) return;
            
            const activeIndex = visibleSlides.indexOf(activeSlide);
            const nextIndex = (activeIndex + 1) % visibleSlides.length;
            
            // 找到可见幻灯片的索引并导航到它
            goToPortfolioSlide(Array.from(slides).indexOf(visibleSlides[nextIndex]));
            
            // 重置自动轮播计时器
            startPortfolioAutoplay();
        });
    }
    
    // 添加触摸滑动支持
    const carousel = document.querySelector('.portfolio-carousel');
    if (carousel) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            // 暂停自动轮播
            stopPortfolioAutoplay();
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            // 恢复自动轮播
            startPortfolioAutoplay();
        }, { passive: true });
        
        function handleSwipe() {
            const activeSlide = document.querySelector('.portfolio-slide.active');
            const visibleSlides = Array.from(slides).filter(slide => 
                window.getComputedStyle(slide).display !== 'none');
            
            if (!activeSlide || visibleSlides.length === 0) return;
            
            const activeIndex = visibleSlides.indexOf(activeSlide);
            
            if (touchEndX < touchStartX - 50) {
                // 左滑 - 下一张
                const nextIndex = (activeIndex + 1) % visibleSlides.length;
                goToPortfolioSlide(Array.from(slides).indexOf(visibleSlides[nextIndex]));
            }
            
            if (touchEndX > touchStartX + 50) {
                // 右滑 - 上一张
                const prevIndex = (activeIndex - 1 + visibleSlides.length) % visibleSlides.length;
                goToPortfolioSlide(Array.from(slides).indexOf(visibleSlides[prevIndex]));
            }
        }
    }
    
    // 鼠标悬停时暂停自动轮播，移出时恢复
    if (carousel) {
        carousel.addEventListener('mouseenter', stopPortfolioAutoplay);
        carousel.addEventListener('mouseleave', startPortfolioAutoplay);
    }
    
    // 启动自动轮播
    startPortfolioAutoplay();
    
    console.log('Portfolio carousel initialization complete');
}

// 切换到特定幻灯片
function goToPortfolioSlide(index) {
    const slides = document.querySelectorAll('.portfolio-slide');
    const indicators = document.querySelectorAll('.portfolio-indicator');
    
    if (index < 0 || index >= slides.length) {
        console.warn(`Invalid slide index: ${index}`);
        return;
    }
    
    // 如果目标幻灯片不可见（被过滤掉了），不进行操作
    if (window.getComputedStyle(slides[index]).display === 'none') {
        console.warn(`Cannot navigate to slide ${index} - it's filtered out`);
        return;
    }
    
    // 移除所有激活状态
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // 激活目标幻灯片和指示器
    slides[index].classList.add('active');
    
    // 找到与当前幻灯片位置相对应的指示器
    const visibleSlides = Array.from(slides).filter(slide => 
        window.getComputedStyle(slide).display !== 'none');
    const relativeIndex = visibleSlides.indexOf(slides[index]);
    
    if (relativeIndex >= 0 && relativeIndex < indicators.length) {
        indicators[relativeIndex].classList.add('active');
    }
    
    console.log(`Navigated to portfolio slide ${index}`);
}

// Update active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .metric, .portfolio-item, .strength-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.9) {
            element.classList.add('fade-in');
        }
    });
}

/**
 * Initialize the project carousel navigation with auto-rotation
 */
function initProjectCarousel() {
    console.log("Initializing project carousel...");
    
    const projectSlides = document.querySelectorAll('.project-slide');
    const navButtons = document.querySelectorAll('.project-carousel-nav .carousel-nav-btn');
    
    if (projectSlides.length === 0 || navButtons.length === 0) {
        console.warn("Project carousel elements not found");
        return;
    }
    
    console.log(`Found ${projectSlides.length} project slides and ${navButtons.length} navigation buttons`);
    
    // 1. Clear out existing active states first
    projectSlides.forEach(slide => slide.classList.remove('active'));
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // 2. Set initial active state
    if (projectSlides.length > 0 && navButtons.length > 0) {
        projectSlides[0].classList.add('active');
        navButtons[0].classList.add('active');
    }
    
    // 自动轮播变量
    let projectAutoplayInterval = null;
    const autoplayDelay = 6000; // 6秒切换一次，与作品集错开
    
    // 自动轮播函数
    function startProjectAutoplay() {
        stopProjectAutoplay(); // 先停止当前的自动播放
        
        projectAutoplayInterval = setInterval(() => {
            const activeSlide = document.querySelector('.project-slide.active');
            if (!activeSlide) return;
            
            const activeIndex = Array.from(projectSlides).indexOf(activeSlide);
            const nextIndex = (activeIndex + 1) % projectSlides.length;
            
            // 激活下一个幻灯片
            goToProjectSlide(nextIndex);
        }, autoplayDelay);
    }
    
    // 停止自动轮播
    function stopProjectAutoplay() {
        if (projectAutoplayInterval) {
            clearInterval(projectAutoplayInterval);
            projectAutoplayInterval = null;
        }
    }
    
    // 切换到特定幻灯片
    function goToProjectSlide(index) {
        if (index < 0 || index >= projectSlides.length) return;
        
        // 移除所有激活状态
        projectSlides.forEach(slide => slide.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // 激活目标幻灯片和导航按钮
        projectSlides[index].classList.add('active');
        navButtons[index].classList.add('active');
    }
    
    // 3. Set up direct click handlers using data-project attribute
    navButtons.forEach((button, index) => {
        // Remove existing event listeners by replacing with a clone
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add a fresh event listener
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            goToProjectSlide(index);
            
            // 重置自动轮播
            startProjectAutoplay();
        });
    });
    
    // 添加鼠标悬停控制
    const carousel = document.querySelector('.project-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopProjectAutoplay);
        carousel.addEventListener('mouseleave', startProjectAutoplay);
    }
    
    // 启动自动轮播
    startProjectAutoplay();
    
    console.log("Project carousel initialization complete");
}

// 返回顶部按钮功能
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // 初始检查
    toggleBackToTopButton();
    
    // 点击事件
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 控制返回顶部按钮的显示/隐藏
function toggleBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // 当滚动超过500px时显示按钮
    if (scrollPosition > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// 初始化知识树
function initKnowledgeTree() {
    console.log('Initializing knowledge tree...');
    
    const knowledgeNodes = document.querySelectorAll('.knowledge-node');
    const primaryNodes = document.querySelectorAll('.primary-node');
    const coreNode = document.getElementById('core-node');
    const knowledgeLeaves = document.querySelectorAll('.knowledge-leaf');
    const connections = document.querySelectorAll('.connection-path');
    let activeNode = null;
    
    // Animate connections with a staggered delay
    connections.forEach((connection, index) => {
        // Initially hide all connections
        connection.style.opacity = '0';
        connection.style.strokeDashoffset = '100';
        
        // Animate each connection with delay
        setTimeout(() => {
            connection.style.transition = 'opacity 1s ease, stroke-dashoffset 1.5s ease';
            connection.style.opacity = '0.5';
            connection.style.strokeDashoffset = '0';
        }, 500 + (index * 150));
    });
    
    // Function to handle node clicks
    function handleNodeClick(node) {
        // Reset all nodes and leaves first
        primaryNodes.forEach(n => n.classList.remove('active'));
        if (coreNode) coreNode.classList.remove('active');
        knowledgeLeaves.forEach(leaf => leaf.classList.remove('active'));
        
        // If clicking the already active node, just deactivate it
        if (activeNode === node) {
            activeNode = null;
            resetConnections();
            return;
        }
        
        // Set the clicked node as active
        node.classList.add('active');
        activeNode = node;
        
        // Find and activate the corresponding leaf
        const nodeId = node.id;
        const leaf = document.querySelector(`.knowledge-leaf[data-parent="${nodeId}"]`);
        if (leaf) {
            leaf.classList.add('active');
        }
        
        // Highlight related connections
        highlightConnections(nodeId);
    }
    
    // Add click functionality to primary nodes
    primaryNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleNodeClick(node);
        });
    });
    
    // Add click functionality to core node
    if (coreNode) {
        coreNode.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleNodeClick(coreNode);
        });
    }
    
    // Add hover effects for connections
    knowledgeNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            // Only highlight on hover if no node is currently active
            if (!activeNode) {
                const nodeId = node.id || 'core';
                highlightConnections(nodeId);
            }
        });
        
        node.addEventListener('mouseleave', () => {
            // Only reset on mouseleave if no node is currently active
            if (!activeNode) {
                resetConnections();
            }
        });
    });
    
    // Function to highlight connections based on node ID
    function highlightConnections(nodeId) {
        let relatedConnections = [];
        
        if (nodeId === 'core-node' || nodeId === 'core' || !nodeId) {
            relatedConnections = document.querySelectorAll('.core-to-vision, .core-to-nlp, .core-to-multimodal, .core-to-tools');
        } else if (nodeId === 'vision-node') {
            relatedConnections = document.querySelectorAll('.core-to-vision, .vision-to-nlp, .vision-to-multimodal');
        } else if (nodeId === 'nlp-node') {
            relatedConnections = document.querySelectorAll('.core-to-nlp, .vision-to-nlp, .nlp-to-multimodal, .nlp-to-tools');
        } else if (nodeId === 'multimodal-node') {
            relatedConnections = document.querySelectorAll('.core-to-multimodal, .vision-to-multimodal, .nlp-to-multimodal, .multimodal-to-tools');
        } else if (nodeId === 'tools-node') {
            relatedConnections = document.querySelectorAll('.core-to-tools, .nlp-to-tools, .multimodal-to-tools');
        }
        
        // Reset all connections first
        resetConnections();
        
        // Highlight related connections
        relatedConnections.forEach(conn => {
            conn.style.opacity = '0.8';
            conn.style.strokeWidth = '3';
        });
    }
    
    // Function to reset connection styles
    function resetConnections() {
        connections.forEach(conn => {
            conn.style.opacity = '0.5';
            conn.style.strokeWidth = '2';
        });
    }
    
    // Add click event to document to close active leaf when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.knowledge-node') && !e.target.closest('.knowledge-leaf')) {
            primaryNodes.forEach(n => n.classList.remove('active'));
            if (coreNode) coreNode.classList.remove('active');
            knowledgeLeaves.forEach(leaf => leaf.classList.remove('active'));
            activeNode = null;
            resetConnections();
        }
    });
    
    console.log('Knowledge tree initialized with click functionality');
}

/**
 * Initialize the skills section as a knowledge graph
 */
function initSkillsKnowledgeGraph() {
    console.log('Initializing Skills Knowledge Graph...');
    
    // DOM Elements
    const entityNodes = document.querySelectorAll('.entity-node');
    const domainNodes = document.querySelectorAll('.primary-node');
    const storeNode = document.getElementById('core-node');
    const knowledgeDetails = document.querySelectorAll('.knowledge-leaf');
    const relationships = document.querySelectorAll('.connection-path');
    let activeEntity = null;
    
    // Initialize node pulse effect elements
    entityNodes.forEach(node => {
        const nodePulse = node.querySelector('.node-pulse');
        if (nodePulse) {
            // Apply color based on node type
            if (node.id === 'vision-node') {
                nodePulse.style.boxShadow = '0 0 15px rgba(5, 217, 232, 0.7)';
            } else if (node.id === 'nlp-node') {
                nodePulse.style.boxShadow = '0 0 15px rgba(255, 42, 109, 0.7)';
            } else if (node.id === 'multimodal-node') {
                nodePulse.style.boxShadow = '0 0 15px rgba(124, 77, 255, 0.7)';
            } else if (node.id === 'tools-node') {
                nodePulse.style.boxShadow = '0 0 15px rgba(255, 160, 0, 0.7)';
            } else if (node.id === 'core-node') {
                nodePulse.style.boxShadow = '0 0 15px rgba(255, 42, 109, 0.7)';
            }
        }
    });

    // Function to handle entity node clicks - reveals knowledge details
    function handleEntityClick(node) {
        // Create semantic triple visualization when node is clicked
        visualizeTriple(node);
        
        // Play interaction sound (if audio enabled)
        playInteractionSound(node.id);
        
        // Reset all nodes and details first
        domainNodes.forEach(n => n.classList.remove('active'));
        if (storeNode) storeNode.classList.remove('active');
        knowledgeDetails.forEach(detail => detail.classList.remove('active'));
        
        // If clicking the already active entity, just deactivate it
        if (activeEntity === node) {
            activeEntity = null;
            resetRelationships();
            // Hide triple visualization
            document.querySelector('.triple-visualization')?.classList.remove('active');
            return;
        }
        
        // Set the clicked entity as active
        node.classList.add('active');
        activeEntity = node;
        
        // Find and activate the corresponding knowledge detail
        const nodeId = node.id;
        const detail = document.querySelector(`.knowledge-leaf[data-parent="${nodeId}"]`);
        if (detail) {
            detail.classList.add('active');
            
            // Add a slight delay to ensure the detail is visible before scrolling on mobile
            setTimeout(() => {
                // On mobile, scroll to the knowledge detail
                if (window.innerWidth < 768) {
                    const detailRect = detail.getBoundingClientRect();
                    const offset = detailRect.top + window.scrollY - 100; // 100px offset from top
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
        
        // Highlight related relationships
        highlightRelationships(nodeId);
    }
    
    // Add click functionality to domain nodes
    domainNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleEntityClick(node);
        });
    });
    
    // Add click functionality to store node
    if (storeNode) {
        storeNode.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleEntityClick(storeNode);
        });
    }
    
    // Add hover effects for relationships
    entityNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            // Only highlight on hover if no entity is currently active
            if (!activeEntity) {
                const nodeId = node.id || 'core';
                highlightRelationships(nodeId);
            }
        });
        
        node.addEventListener('mouseleave', () => {
            // Only reset on mouseleave if no entity is currently active
            if (!activeEntity) {
                resetRelationships();
            }
        });
    });
    
    // Function to highlight relationships based on node ID
    function highlightRelationships(nodeId) {
        let relatedConnections = [];
        
        if (nodeId === 'core-node' || nodeId === 'core' || !nodeId) {
            relatedConnections = document.querySelectorAll('.core-to-vision, .core-to-nlp, .core-to-multimodal, .core-to-tools');
        } else if (nodeId === 'vision-node') {
            relatedConnections = document.querySelectorAll('.core-to-vision, .vision-to-nlp, .vision-to-multimodal');
        } else if (nodeId === 'nlp-node') {
            relatedConnections = document.querySelectorAll('.core-to-nlp, .vision-to-nlp, .nlp-to-multimodal, .nlp-to-tools');
        } else if (nodeId === 'multimodal-node') {
            relatedConnections = document.querySelectorAll('.core-to-multimodal, .vision-to-multimodal, .nlp-to-multimodal, .multimodal-to-tools');
        } else if (nodeId === 'tools-node') {
            relatedConnections = document.querySelectorAll('.core-to-tools, .nlp-to-tools, .multimodal-to-tools');
        }
        
        // Reset all relationships first
        resetRelationships();
        
        // Highlight related relationships
        relatedConnections.forEach(conn => {
            conn.style.opacity = '0.8';
            conn.style.strokeWidth = '3';
            
            // Apply a subtle glow effect based on relationship type
            if (conn.classList.contains('core-to-vision') || conn.classList.contains('vision-to-nlp') || conn.classList.contains('vision-to-multimodal')) {
                conn.style.filter = 'drop-shadow(0 0 3px rgba(5, 217, 232, 0.7))';
            } else if (conn.classList.contains('core-to-nlp') || conn.classList.contains('nlp-to-multimodal') || conn.classList.contains('nlp-to-tools')) {
                conn.style.filter = 'drop-shadow(0 0 3px rgba(255, 42, 109, 0.7))';
            } else if (conn.classList.contains('core-to-multimodal') || conn.classList.contains('multimodal-to-tools')) {
                conn.style.filter = 'drop-shadow(0 0 3px rgba(124, 77, 255, 0.7))';
            } else if (conn.classList.contains('core-to-tools')) {
                conn.style.filter = 'drop-shadow(0 0 3px rgba(255, 160, 0, 0.7))';
            }
        });
    }
    
    // Function to reset relationship styles
    function resetRelationships() {
        relationships.forEach(conn => {
            conn.style.opacity = '0.5';
            conn.style.strokeWidth = '2';
            conn.style.filter = 'none';
        });
    }
    
    // Add click event to document to close active detail when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.entity-node') && !e.target.closest('.knowledge-leaf') && !e.target.closest('.triple-visualization')) {
            domainNodes.forEach(n => n.classList.remove('active'));
            if (storeNode) storeNode.classList.remove('active');
            knowledgeDetails.forEach(detail => detail.classList.remove('active'));
            activeEntity = null;
            resetRelationships();
            
            // Hide triple visualization
            document.querySelector('.triple-visualization')?.classList.remove('active');
        }
    });
    
    // Setup the semantic triple visualization
    setupTripleVisualization();
    
    // Create particle effects for the connections
    createRelationParticles();
    
    // Animate the SVG connections with a staggered reveal
    animateConnections();
    
    // Simulate a click on the core node to highlight it initially
    setTimeout(() => {
        if (storeNode && window.innerWidth > 768) {
            handleEntityClick(storeNode);
            
            // Auto deactivate after 4 seconds to draw attention, then hide
            setTimeout(() => {
                domainNodes.forEach(n => n.classList.remove('active'));
                storeNode.classList.remove('active');
                knowledgeDetails.forEach(detail => detail.classList.remove('active'));
                activeEntity = null;
                resetRelationships();
                
                // Hide triple visualization
                document.querySelector('.triple-visualization')?.classList.remove('active');
            }, 4000);
        }
    }, 1000);
    
    console.log('Skills Knowledge Graph initialized with interactive elements');
}

/**
 * Setup and manage the semantic triple visualization for skills
 */
function setupTripleVisualization() {
    // Create the triple visualization container if it doesn't exist
    if (!document.querySelector('.triple-visualization')) {
        const tripleContainer = document.createElement('div');
        tripleContainer.className = 'triple-visualization';
        document.querySelector('.knowledge-tree-container').appendChild(tripleContainer);
        
        // Style the triple container
        tripleContainer.style.position = 'absolute';
        tripleContainer.style.top = '10px';
        tripleContainer.style.left = '50%';
        tripleContainer.style.transform = 'translateX(-50%)';
        tripleContainer.style.background = 'rgba(10, 15, 30, 0.9)';
        tripleContainer.style.borderRadius = '8px';
        tripleContainer.style.padding = '10px 20px';
        tripleContainer.style.zIndex = '100';
        tripleContainer.style.opacity = '0';
        tripleContainer.style.pointerEvents = 'none';
        tripleContainer.style.transition = 'all 0.3s ease';
        tripleContainer.style.backdropFilter = 'blur(5px)';
        tripleContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        tripleContainer.style.border = '1px solid rgba(5, 217, 232, 0.3)';
        tripleContainer.style.display = 'flex';
        tripleContainer.style.alignItems = 'center';
        tripleContainer.style.justifyContent = 'center';
        tripleContainer.style.gap = '10px';
        tripleContainer.style.flexWrap = 'wrap';
        tripleContainer.style.maxWidth = '80%';
    }
}

/**
 * Generate and display a semantic triple based on the clicked node
 */
function visualizeTriple(node) {
    const tripleContainer = document.querySelector('.triple-visualization');
    if (!tripleContainer) return;
    
    // Clear previous triple
    tripleContainer.innerHTML = '';
    
    // Create triple elements based on the node
    const nodeId = node.id;
    let subject, predicate, object;
    
    // Generate appropriate triple based on node
    if (nodeId === 'core-node') {
        subject = createTripleElement('AI & ML', 'var(--nebula-pink)');
        predicate = createTripleElement('powers', 'var(--text-secondary)');
        object = createTripleElement('All Specializations', 'var(--nebula-blue)');
    } else if (nodeId === 'vision-node') {
        subject = createTripleElement('Computer Vision', 'var(--nebula-blue)');
        predicate = createTripleElement('analyzes', 'var(--text-secondary)');
        object = createTripleElement('Visual Data', 'var(--nebula-pink)');
    } else if (nodeId === 'nlp-node') {
        subject = createTripleElement('NLP', 'var(--nebula-pink)');
        predicate = createTripleElement('processes', 'var(--text-secondary)');
        object = createTripleElement('Text & Language', 'var(--nebula-blue)');
    } else if (nodeId === 'multimodal-node') {
        subject = createTripleElement('Multimodal AI', 'var(--nebula-pink)');
        predicate = createTripleElement('combines', 'var(--text-secondary)');
        object = createTripleElement('Multiple Data Types', 'var(--nebula-blue)');
    } else if (nodeId === 'tools-node') {
        subject = createTripleElement('Tools & Economics', 'var(--nebula-orange)');
        predicate = createTripleElement('supports', 'var(--text-secondary)');
        object = createTripleElement('AI Implementation', 'var(--nebula-blue)');
    }
    
    // Add elements to container
    tripleContainer.appendChild(subject);
    tripleContainer.appendChild(predicate);
    tripleContainer.appendChild(object);
    
    // Show the container
    tripleContainer.style.opacity = '1';
    tripleContainer.style.pointerEvents = 'auto';
    tripleContainer.classList.add('active');
}

/**
 * Create an element for the triple visualization
 */
function createTripleElement(text, color) {
    const element = document.createElement('div');
    element.textContent = text;
    element.style.padding = '5px 10px';
    element.style.borderRadius = '4px';
    element.style.color = color;
    element.style.fontWeight = 'bold';
    element.style.fontSize = '0.9rem';
    
    // Add styling for predicate
    if (text.includes(' ') || ['powers', 'analyzes', 'processes', 'combines', 'supports'].includes(text)) {
        element.style.fontStyle = 'italic';
        element.style.fontWeight = 'normal';
    }
    
    return element;
}

/**
 * Create floating particles along relationship paths for visual effect
 */
function createRelationParticles() {
    const particlesContainer = document.querySelector('.connection-particles');
    if (!particlesContainer) return;
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create a set of floating particles
    const colors = [
        'rgba(5, 217, 232, 0.8)',
        'rgba(255, 42, 109, 0.8)',
        'rgba(124, 77, 255, 0.8)',
        'rgba(255, 160, 0, 0.8)'
    ];
    
    // Create particles along relationship paths
    const relationshipPaths = document.querySelectorAll('.connection-path');
    
    relationshipPaths.forEach(path => {
        // Create a few particles for each path
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'connection-particle';
            
            // Determine color based on path class
            let colorIndex = 0;
            if (path.classList.contains('core-to-vision') || path.classList.contains('vision-to-nlp') || path.classList.contains('vision-to-multimodal')) {
                colorIndex = 0; // Blue
            } else if (path.classList.contains('core-to-nlp') || path.classList.contains('nlp-to-multimodal') || path.classList.contains('nlp-to-tools')) {
                colorIndex = 1; // Pink
            } else if (path.classList.contains('core-to-multimodal') || path.classList.contains('multimodal-to-tools')) {
                colorIndex = 2; // Purple
            } else if (path.classList.contains('core-to-tools')) {
                colorIndex = 3; // Orange
            }
            
            // Apply styles
            particle.style.backgroundColor = colors[colorIndex];
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.boxShadow = `0 0 8px ${colors[colorIndex]}`;
            particle.style.zIndex = '4';
            
            // Position randomly along the path
            const pathBox = path.getBBox();
            let x, y;
            
            // Different positioning strategy based on path type
            if (path.classList.contains('vision-to-nlp') || path.classList.contains('multimodal-to-tools')) {
                // Horizontal paths
                x = pathBox.x + Math.random() * pathBox.width;
                y = pathBox.y;
            } else if (path.classList.contains('vision-to-multimodal') || path.classList.contains('nlp-to-tools')) {
                // Vertical paths
                x = pathBox.x;
                y = pathBox.y + Math.random() * pathBox.height;
            } else {
                // Diagonal paths
                const t = Math.random();
                x = pathBox.x + t * pathBox.width;
                y = pathBox.y + t * pathBox.height;
            }
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Add animation
            particle.style.animation = `particleFloat ${3 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 2}s`;
            
            // Add to container
            particlesContainer.appendChild(particle);
        }
    });
    
    // Add keyframes for particle animation if not already present
    if (!document.querySelector('#particleAnimation')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'particleAnimation';
        styleSheet.textContent = `
            @keyframes particleFloat {
                0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                50% { transform: translate(${Math.random() > 0.5 ? '+' : '-'}${5 + Math.random() * 10}px, ${Math.random() > 0.5 ? '+' : '-'}${5 + Math.random() * 10}px) scale(1.5); opacity: 0.9; }
                100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

/**
 * Animate the SVG relationships with a staggered reveal effect
 */
function animateConnections() {
    const relationships = document.querySelectorAll('.connection-path');
    
    // Animate each relationship with a staggered delay
    relationships.forEach((relationship, index) => {
        setTimeout(() => {
            relationship.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            relationship.style.strokeDashoffset = '0';
        }, 500 + (index * 150));
    });
}

/**
 * Play a subtle interaction sound based on entity type
 */
function playInteractionSound(nodeId) {
    // Create audio context only on user interaction and if audio is supported
    if (!window.audioContext) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            window.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API not supported in this browser');
            return;
        }
    }
    
    // Only proceed if audio context is available
    if (!window.audioContext) return;
    
    // Create oscillator
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    // Set frequency based on node type
    let frequency = 440; // A4 note
    let waveform = 'sine';
    
    if (nodeId === 'core-node') {
        frequency = 523.25; // C5
        waveform = 'sine';
    } else if (nodeId === 'vision-node') {
        frequency = 587.33; // D5
        waveform = 'triangle';
    } else if (nodeId === 'nlp-node') {
        frequency = 659.25; // E5
        waveform = 'sine';
    } else if (nodeId === 'multimodal-node') {
        frequency = 698.46; // F5
        waveform = 'triangle';
    } else if (nodeId === 'tools-node') {
        frequency = 783.99; // G5
        waveform = 'sine';
    }
    
    // Configure oscillator
    oscillator.type = waveform;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.1; // Keep volume low
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    // Envelope
    gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, window.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, window.audioContext.currentTime + 0.2);
    
    // Play and stop
    oscillator.start();
    oscillator.stop(window.audioContext.currentTime + 0.2);
}

/**
 * Ensure SVG relationship paths are properly scaled
 */
function adjustSkillsSVGViewBox() {
    const svg = document.querySelector('.connections-svg');
    const container = document.querySelector('.knowledge-tree-container');
    
    if (svg && container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
} 