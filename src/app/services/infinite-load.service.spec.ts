import { InfiniteLoadService } from './infinite-load.service';

describe('InfiniteLoadService', () => {
  let service: InfiniteLoadService;
  let scrollToSpy: jasmine.Spy;

  beforeEach(() => {
    scrollToSpy = spyOn(window, 'scrollTo').and.callFake(() => {});

    // Mock document.documentElement.scrollHeight
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, writable: true });

    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });

    service = new InfiniteLoadService();
  });

  it('should set scroll position', () => {
    service.setScrollPosition(500);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 500, behavior: 'smooth' });
  });

  it('should toggle scroll position to bottom', () => {
    // Set scrollY to 0
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(0);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    service.toggleScrollPosition();
    expect(scrollToSpy).toHaveBeenCalledWith({ top: maxScroll, behavior: 'smooth' });
  });

  it('should toggle scroll position to top', () => {
    // Set scrollY to maxScroll
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(maxScroll);
    service.toggleScrollPosition();
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
