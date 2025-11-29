<?php

$hash = getenv('JSONMS_HASH');
$data = json_decode(file_get_contents(getenv('JSONMS_DATA_PATH') . $hash . '.json'));
$settings = ['publicUrl' => getenv('JSONMS_PUBLIC_URL')];
$json = json_encode(['data' => $data, 'settings' => $settings]);
$html = file_get_contents(getcwd() . '/index.html');
$html = str_replace('</head>', "<script>window.jsonMs = $json</script></head>", $html);
echo $html;
exit;
