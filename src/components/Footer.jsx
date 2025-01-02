import React from 'react'

export const Footer = () => {
  return (
    <div>
        <footer class="bg-gray-900 text-white py-6 ">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center">
     
      <div class="text-2xl font-semibold">
        <a href="/" class="text-white hover:text-gray-400">Mvdb</a>
      </div>

    
      <div class="flex space-x-6">
        <a href="/privacy" class="hover:text-gray-400">Privacy Policy</a>
        <a href="/terms" class="hover:text-gray-400">Terms of Service</a>
        <a href="/contact" class="hover:text-gray-400">Contact</a>
      </div>
    </div>

   
    <div class="mt-4 flex justify-center space-x-6">
      <a href="https://facebook.com" class="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
        <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M22 12l-9 9-9-9 9-9 9 9z"></path>
        </svg>
      </a>
      <a href="https://twitter.com" class="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
        <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M22 12l-9 9-9-9 9-9 9 9z"></path>
        </svg>
      </a>
      <a href="https://instagram.com" class="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
        <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M22 12l-9 9-9-9 9-9 9 9z"></path>
        </svg>
      </a>
    </div>

   
    <div class="mt-6 text-center text-sm text-gray-400">
      <p>&copy; 2025 Mvdb. All rights reserved.</p>
    </div>
  </div>
</footer>


    </div>
  )
}
