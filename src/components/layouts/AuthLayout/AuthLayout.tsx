import Side from './Side'
// import Cover from './Cover'
// import Simple from './Simple'
import View from '@/views'
import { useAppSelector } from '@/store'
import { LAYOUT_TYPE_BLANK, LAYOUT_TYPE_HOME } from '@/constants/theme.constant'

const AuthLayout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)

    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            {layoutType === LAYOUT_TYPE_BLANK || layoutType === LAYOUT_TYPE_HOME? (
                <View />
            ) : (
                <Side>
                    <View />
                </Side>
            )}
        </div>
    )
}

export default AuthLayout
