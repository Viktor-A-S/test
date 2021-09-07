import { ServiceConsumer } from "../service-context"

const withService = () => (Wrapped) => {
    return (props) => {
        return (
            <ServiceConsumer>
                {
                    (withService) => <Wrapped {... props } withService = { withService } />
                }
            </ServiceConsumer>
        )
    }
}

export default withService