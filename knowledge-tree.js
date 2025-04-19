/**
 * RAG Knowledge Graph Visualization
 * Interactive visualization of knowledge graph concepts for Retrieval-Augmented Generation
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing RAG Knowledge Graph Visualization...');
    initKnowledgeGraph();
    createRelationParticles();
    animateConnections();
    setupTripleVisualization();
});

/**
 * Initialize the knowledge graph interactive functionality
 */
function initKnowledgeGraph() {
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
        
        // Play interaction sound
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
    
    // Simulate a click on the Document Store node to highlight it initially
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
    
    console.log('Knowledge Graph initialized with interactive elements');
}

/**
 * Setup and manage the semantic triple visualization
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
        subject = createTripleElement('Document Store', 'var(--nebula-pink)');
        predicate = createTripleElement('contains', 'var(--text-secondary)');
        object = createTripleElement('Structured Data', 'var(--nebula-blue)');
    } else if (nodeId === 'vision-node') {
        subject = createTripleElement('Concept', 'var(--nebula-blue)');
        predicate = createTripleElement('defined by', 'var(--text-secondary)');
        object = createTripleElement('Ontology', 'var(--nebula-pink)');
    } else if (nodeId === 'nlp-node') {
        subject = createTripleElement('Entity', 'var(--nebula-pink)');
        predicate = createTripleElement('has property', 'var(--text-secondary)');
        object = createTripleElement('Attribute', 'var(--nebula-blue)');
    } else if (nodeId === 'multimodal-node') {
        subject = createTripleElement('Entity', 'var(--nebula-pink)');
        predicate = createTripleElement('relates to', 'var(--text-secondary)');
        object = createTripleElement('Entity', 'var(--nebula-blue)');
    } else if (nodeId === 'tools-node') {
        subject = createTripleElement('LLM', 'var(--nebula-orange)');
        predicate = createTripleElement('queries', 'var(--text-secondary)');
        object = createTripleElement('Knowledge Graph', 'var(--nebula-blue)');
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
    
    // Add arrow for predicate
    if (text.includes(' ')) {
        element.style.fontStyle = 'italic';
        element.style.fontWeight = 'normal';
    }
    
    return element;
}

/**
 * Create floating particles along the relationship paths for visual effect
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
    
    // Add keyframes for particle animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes particleFloat {
            0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
            50% { transform: translate(${Math.random() > 0.5 ? '+' : '-'}${5 + Math.random() * 10}px, ${Math.random() > 0.5 ? '+' : '-'}${5 + Math.random() * 10}px) scale(1.5); opacity: 0.9; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
        }
    `;
    document.head.appendChild(styleSheet);
    
    console.log('Knowledge Graph relationships initialized with particle effects');
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
    
    console.log('Knowledge Graph relationship animations initialized');
}

/**
 * Play a subtle interaction sound based on entity type
 */
function playInteractionSound(nodeId) {
    // Create audio context only on user interaction
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

// Responsive adjustments
window.addEventListener('resize', () => {
    console.log('Window resized, updating knowledge graph...');
    createRelationParticles(); // Recreate particles to match new window size
});

// Ensure SVG relationship paths are properly scaled
function adjustSVGViewBox() {
    const svg = document.querySelector('.connections-svg');
    const container = document.querySelector('.knowledge-tree-container');
    
    if (svg && container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
}

// Call adjustment on load and resize
window.addEventListener('load', adjustSVGViewBox);
window.addEventListener('resize', adjustSVGViewBox); 