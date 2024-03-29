import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

      <h1 className="head_text text-center prompthead dark:text-white">
        Discover and Share
        <br className='max-md:hidden'  />
        <span className="orange_gradient text-center"> AI-Powered Promts</span>
      </h1>

      <p className="desc text-center">
        Prompt Dairy is a open-source AI prompting tool for mordern worrld to discover,
        create and share creative prompts
      </p>

      <Feed/>

    </section>
  )
}

export default Home