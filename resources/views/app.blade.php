<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="manifest" href="manifest.json">
        <meta name="theme-color" content="#6d65fc">
 

        <style>
            html {
                background-color: oklch(1 0 0);
            }

        </style>

        <title inertia>{{ config('app.name', 'Holy Hack') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        <script>
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/service-worker.js')
                .then((reg) => console.log('Service Worker Registered', reg))
                .catch((err) => console.log('Service Worker Registration Failed', err));
            }
            </script>
            
    </body>
</html>
