import { ServiceConsumer } from '../service-context'

const withService = () => 
    Wrapped => 
        props => 
            <ServiceConsumer>
                {
                    (withService) => <Wrapped { ... props } withService={ withService } />
                }
            </ServiceConsumer>

export default withService