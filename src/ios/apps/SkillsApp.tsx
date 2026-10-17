import { techStack } from '../../macOS/constants'
import { Group, Row, Screen, SectionHeader } from '../components/Screen'

// Skills, laid out like Settings: one group per area.
const SkillsApp = () => (
  <Screen title="Skills">
    {techStack.map(({ category, items }) => (
      <section key={category}>
        <SectionHeader>{category}</SectionHeader>
        <Group>
          {items.map((item) => (
            <Row key={item}>{item}</Row>
          ))}
        </Group>
      </section>
    ))}
  </Screen>
)

export default SkillsApp
