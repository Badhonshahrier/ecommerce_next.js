export const showToast = (message, type = "success") => {
  const toastContainer = document.getElementById("toast-root")
  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-500 hover:text-gray-700">
        ×
      </button>
    </div>
  `

  toastContainer.appendChild(toast)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 5000)
}
