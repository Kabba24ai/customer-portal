<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} - Customer Portal</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-gray-100">
    <div class="min-h-screen">
        <!-- Development Mode Toggle -->
        @if(config('app.debug'))
        <div class="bg-yellow-100 border-b border-yellow-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between py-2">
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-medium text-yellow-800">🚧 DEVELOPMENT ONLY</span>
                        <span class="text-xs text-yellow-700">|</span>
                        <span class="text-xs text-yellow-700">View Mode:</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <a href="{{ route('customer.dashboard', $customer) }}" 
                           class="px-3 py-1 text-xs font-medium rounded-md transition-colors {{ request()->routeIs('customer.*') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300' }}">
                            👤 Customer Portal
                        </a>
                        <a href="{{ route('admin.dashboard', $customer) }}" 
                           class="px-3 py-1 text-xs font-medium rounded-md transition-colors {{ request()->routeIs('admin.*') ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300' }}">
                            🔧 Admin Portal
                        </a>
                    </div>
                </div>
            </div>
        </div>
        @endif

        <!-- Navigation Header -->
        <div class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <h1 class="text-xl font-bold text-gray-900">{{ $customer->company_name }}</h1>
                        <span class="ml-3 text-sm text-gray-500">
                            {{ request()->routeIs('customer.*') ? 'Customer Portal' : 'Admin Portal' }}
                        </span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <svg class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-12"></path>
                        </svg>
                        <div class="flex items-center space-x-3">
                            <div class="text-right">
                                <p class="text-sm font-medium text-gray-900">{{ $customer->full_name }}</p>
                                <p class="text-xs text-gray-500">{{ $customer->email }}</p>
                            </div>
                            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="bg-white border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex space-x-8">
                    @php
                        $routePrefix = request()->routeIs('customer.*') ? 'customer' : 'admin';
                        $tabs = [
                            ['id' => 'dashboard', 'label' => 'Dashboard', 'icon' => 'trending-up'],
                            ['id' => 'orders', 'label' => 'Orders', 'icon' => 'file-text'],
                            ['id' => 'credit-account', 'label' => 'Credit Account', 'icon' => 'dollar-sign'],
                            ['id' => 'invoices', 'label' => 'Invoices', 'icon' => 'credit-card'],
                            ['id' => 'account', 'label' => 'Account', 'icon' => 'settings']
                        ];
                    @endphp
                    
                    @foreach($tabs as $tab)
                        <a href="{{ route($routePrefix . '.' . $tab['id'], $customer) }}" 
                           class="flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors {{ request()->routeIs($routePrefix . '.' . $tab['id']) ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' }}">
                            @include('components.icon', ['name' => $tab['icon'], 'class' => 'w-4 h-4 mr-2'])
                            {{ $tab['label'] }}
                            @if(request()->routeIs('admin.*'))
                                <span class="ml-1 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Admin</span>
                            @endif
                        </a>
                    @endforeach
                </nav>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            @if(session('success'))
                <div class="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
                    <div class="flex">
                        <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-green-800">{{ session('success') }}</p>
                        </div>
                    </div>
                </div>
            @endif

            @if($errors->any())
                <div class="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                    <div class="flex">
                        <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                        </svg>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">There were errors with your submission:</h3>
                            <ul class="mt-2 text-sm text-red-700 list-disc list-inside">
                                @foreach($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif

            @yield('content')
        </div>
    </div>

    @stack('scripts')
</body>
</html>