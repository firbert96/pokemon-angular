import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfiniteLoadService {
  setScrollPosition(y: number) {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: y,
        behavior: 'smooth' // Optional: for smooth scrolling
      });
    }
  }

  // Method to toggle scroll position
  toggleScrollPosition() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.setScrollPosition(currentScroll === 0 ? maxScroll : 0);
    }
  }
}
