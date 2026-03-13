import https from 'https';

https.get('https://morningside.ai/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    import('fs').then(fs => {
      const startIndex = data.indexOf('<section class="section_testimonials">');
      if (startIndex !== -1) {
        const endIndexStr = '</section>';
        const endIndex = data.indexOf(endIndexStr, startIndex);
        if (endIndex !== -1) {
            const sectionHTML = data.substring(startIndex, endIndex + endIndexStr.length);
            fs.writeFileSync('/Users/jordy/JordanLeeAI/apps/morningside-clone/missing_section.html', sectionHTML);
            console.log('Saved successfully');
        } else {
             console.log('End of section not found');
        }
      } else {
          console.log('Section start not found. Looking for "Don’t just take our word for it"');
          // Fallback search
          const quoteIndex = data.indexOf("Don’t just take our word for it");
          if (quoteIndex !== -1) {
             const tagStart = data.lastIndexOf('<section', quoteIndex);
             const tagEnd = data.indexOf('</section>', tagStart);
             const fallbackHTML = data.substring(tagStart, tagEnd + 10);
             fs.writeFileSync('/Users/jordy/JordanLeeAI/apps/morningside-clone/missing_section.html', fallbackHTML);
             console.log('Saved successfully via fallback');
          } else {
              console.log("Could not find quote.");
          }
      }
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
