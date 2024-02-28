import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout the javaScript repo on GitHub
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://github.com/fitsaleem/javaScript-course--zero-to-hero" target='_blank' rel='noopener noreferrer'>
                    Learn More
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://repository-images.githubusercontent.com/276969830/b40d9c00-c6c1-11ea-93ee-b9b7bb86e0ad" />
        </div>
    </div>
  )
}