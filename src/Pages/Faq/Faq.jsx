const Faq = () => {
  return (
    <div className="max-w-3xl mx-auto px-3 xl:px-0 mt-10 mb-16">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl capitalize mb-5">FAQs</h2>
        <div className="flex justify-center">
          <div className="w-16 h-2 bg-red-500 rounded-xl"></div>
        </div>
      </div>
      <div className="mt-10 space-y-5">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" defaultChecked="checked" />
          <div className="collapse-title text-xl font-medium">1. Question?</div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> Answer here
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" />
          <div className="collapse-title text-xl font-medium">2. Question?</div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> Answer here
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" />
          <div className="collapse-title text-xl font-medium">3. Question?</div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> Answer here
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" />
          <div className="collapse-title text-xl font-medium">4. Question?</div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> Answer here
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" />
          <div className="collapse-title text-xl font-medium">5. Question?</div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> Answer here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
