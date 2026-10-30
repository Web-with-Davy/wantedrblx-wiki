<?php
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: public, max-age=300');

$SITE = 'https://wantedrblx.com';
$DEFAULT_IMG = $SITE . '/images/og-image.webp';
$DEFAULT_DESC = 'The Roblox Wanted Wiki — find all weapons, vehicles, missions, valuables, promo codes and more!';

$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$id = isset($_GET['id']) ? trim($_GET['id']) : '';

$item = null;
$dataFile = __DIR__ . '/items-data.json';

if (file_exists($dataFile)) {
    $items = json_decode(file_get_contents($dataFile), true);
    if ($items && isset($items[$category])) {
        if (isset($items[$category][$id])) {
            $item = $items[$category][$id];
        } else {
            // Slugify fallback
            $norm = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $id), '-'));
            if (isset($items[$category][$norm])) {
                $item = $items[$category][$norm];
            }
        }
    }
}

$title = ($item && !empty($item['n'])) ? $item['n'] . ' — Wanted Wiki' : 'Wanted Wiki';
$desc  = ($item && !empty($item['d'])) ? $item['d'] : $DEFAULT_DESC;
$img   = ($item && !empty($item['i'])) ? $item['i'] : $DEFAULT_IMG;

$canonical = $category && $id ? "$SITE/item/$category/$id" : $SITE;
$hashUrl   = $category && $id ? "$SITE/#item/$category/$id" : $SITE;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
  <meta name="description" content="<?= htmlspecialchars($desc, ENT_QUOTES, 'UTF-8') ?>">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Wanted Wiki">
  <meta property="og:url" content="<?= htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:title" content="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:description" content="<?= htmlspecialchars($desc, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:image" content="<?= htmlspecialchars($img, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  <meta property="og:image:alt" content="<?= htmlspecialchars($item && !empty($item['n']) ? $item['n'] : 'Wanted Wiki', ENT_QUOTES, 'UTF-8') ?>">

  <!-- Twitter Card: summary gives Discord the small side thumbnail -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>">
  <meta name="twitter:description" content="<?= htmlspecialchars($desc, ENT_QUOTES, 'UTF-8') ?>">
  <meta name="twitter:image" content="<?= htmlspecialchars($img, ENT_QUOTES, 'UTF-8') ?>">

  <link rel="canonical" href="<?= htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') ?>">
  <meta http-equiv="refresh" content="0;url=<?= htmlspecialchars($hashUrl, ENT_QUOTES, 'UTF-8') ?>">
</head>
<body>
  <script>location.replace(<?= json_encode($hashUrl) ?>);</script>
  <p>Redirecting to <a href="<?= htmlspecialchars($hashUrl, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></a>…</p>
</body>
</html>

