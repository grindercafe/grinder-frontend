import Layout from "../components/Layout"
import Hero from "../components/Hero"

export function HomePage() {
    return (
        <Layout child={'home'}>
            <Hero />
        </Layout>
    )
}