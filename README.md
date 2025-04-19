# JamSylph.top - Personal Website

A modern, cyberpunk-themed personal portfolio website for an algorithm engineer, featuring a responsive design, interactive elements, and a bilingual interface (English/Chinese).

![Cyberpunk Portfolio](preview.png)

## 🌟 Features

- **Cyberpunk Aesthetic**: Modern design with glitch effects, gradients, and neon colors
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive Elements**: 3D globe animation, interactive persona selection, and more
- **Dark Theme**: Eye-friendly dark theme with vibrant accents
- **Bilingual Support**: Toggle between English and Chinese
- **Performance Optimized**: Fast loading times and smooth animations
- **Core Strengths Section**: Showcase your primary skills and abilities
- **Project Showcase**: Display your best projects with descriptions and links

## 📂 File Structure

```
jamsylph.top/
├── index.html          # Main HTML file with website structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality and 3D globe
├── README.md           # Documentation (this file)
└── assets/             # Images and additional resources
```

## 🚀 Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jamsylph.top.git
   cd jamsylph.top
   ```

2. Open `index.html` in your browser to view the website locally

3. Customize the content by editing:
   - `index.html` for text and structure
   - `styles.css` for styling and visual effects
   - `script.js` for functionality and animations

## 🎨 Customization

### Personal Information
- Update the text in `index.html` to reflect your personal details
- Replace the avatar image by updating the image URL in `styles.css`
- Modify your social media links in the contact section

### Projects
- Add your own projects by duplicating the project card template
- Update project titles, descriptions, and links
- Add appropriate tech tags for each project

### Skills
- Customize the skills section to match your expertise
- Add or remove skill categories as needed

## 🖥️ Deployment

### Option 1: Deploying to Cloudflare Pages (Recommended for jamsylph.top)

Since you've already registered your domain with Cloudflare, using Cloudflare Pages is the easiest way to deploy your website:

1. **Create a GitHub repository** for your website code
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/jamsylph.top.git
   git push -u origin main
   ```

2. **Login to your Cloudflare account**
   - Go to the Cloudflare dashboard
   - Navigate to "Pages" from the sidebar

3. **Create a new Pages project**
   - Click "Create a project"
   - Connect your GitHub account
   - Select the repository you created

4. **Configure your build settings**
   - Build command: leave empty (static site)
   - Build output directory: leave empty or use `.` (root directory)
   - Click "Save and Deploy"

5. **Configure custom domain**
   - Go to your Pages project
   - Click on "Custom domains"
   - Add your domain `jamsylph.top`
   - Cloudflare will automatically configure the DNS settings since your domain is already on Cloudflare

6. **Update your code and redeploy**
   - Each time you push changes to GitHub, Cloudflare will automatically rebuild and deploy your site

### Option 2: Traditional Web Hosting

If you prefer traditional web hosting:

1. **Sign up for web hosting** with a provider of your choice
2. **Upload your files** to the hosting server using FTP or the provided control panel
3. **Point your domain** to your hosting provider by updating nameservers or DNS records

## 🚀 Performance Optimization

The website is already optimized for performance, but here are some additional tips:

1. **Compress images** before adding them to the site
2. **Minify CSS and JavaScript** files for production
3. **Use browser caching** by adding appropriate headers
4. **Consider a CDN** for global performance (already included if using Cloudflare)

## 🔍 SEO Tips

To improve search engine visibility:

1. Add appropriate meta tags in the `<head>` section:
   ```html
   <meta name="description" content="JamSylph - Algorithm Engineer and Data Scientist. Exploring the boundaries of data, building an intelligent future.">
   <meta name="keywords" content="algorithm engineer, data scientist, machine learning, AI, portfolio, cyberpunk">
   ```

2. Ensure all images have descriptive `alt` attributes
3. Use semantic HTML elements consistently
4. Create a `sitemap.xml` file and submit it to search engines

## 🌐 Browser Compatibility

The website is compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)
- Opera (latest)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For any questions or suggestions, please reach out via:
- Email: your-email@example.com
- GitHub: [jamsylph](https://github.com/jamsylph)
- LinkedIn: [JamSylph](https://www.linkedin.com/in/jamsylph) 