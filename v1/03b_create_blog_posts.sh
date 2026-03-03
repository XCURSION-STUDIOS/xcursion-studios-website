#!/bin/bash
# 03b_create_blog_posts.sh — Generates stub page for each blog post (UPDATED)
set -e

make_post() {
  local SLUG=$1 TITLE=$2 CAT=$3 DATE=$4 EXCERPT=$5
  cat > "blog/${SLUG}.html" << POSTEOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${TITLE} — XCURSION</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cormorant+SC:wght@300;400&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <nav>
    <a href="../index.html" class="nav-logo">Xcursion</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="." class="active">Blog</a></li>
      <li><a href="../shop/">Shop</a></li>
      <li><a href="../projects/">Projects</a></li>
    </ul>
  </nav>
  <main style="padding:140px 56px 100px;max-width:760px;">
    <div class="section-label">${CAT} &middot; ${DATE}</div>
    <h1 class="section-title">${TITLE}</h1>
    <p style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;line-height:1.85;color:rgba(237,232,224,0.7);">
      ${EXCERPT}
    </p>
    <p style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;line-height:1.85;color:rgba(237,232,224,0.7);margin-top:32px;">
      <!-- Full post content goes here -->
    </p>
    <div style="margin-top:64px;border-top:1px solid rgba(237,232,224,0.1);padding-top:32px;">
      <a href="." class="btn-line">&larr; Back to Blog</a>
    </div>
  </main>
</body>
</html>
POSTEOF
  echo "✓ blog/${SLUG}.html"
}

make_post "kyoto"         "Finding stillness in Kyoto"                             "Travel"         "Feb 2025" "Somewhere between the third temple and a bowl of ramen, I stopped trying to optimise the trip."
make_post "hollow-knight" "Hollow Knight and the philosophy of getting lost"        "Review · Game"  "Jan 2025" "A game that rewards you for not knowing what you're doing."
make_post "being-behind"  "On the feeling of being behind, and why it's wrong"     "Philosophy"     "Dec 2024" "You're not behind. There's no finish line. This is the excursion."
make_post "naval-almanack" "The Almanack of Naval Ravikant"                        "Review · Book"  "Nov 2024" "Not a summary. Just the parts that hit different at 2am."
make_post "lagos"         "48 hours in Lagos"                                      "Travel"         "Oct 2024" "Chaotic, warm, overwhelming, electric. Leave the plan at the airport."
make_post "boredom"       "Why boredom is the most underrated creative tool"       "Random Thoughts" "Sep 2024" "The best ideas I've had happened where nothing was demanding my attention."

echo "All blog post stubs created."
