class Pacman {
    constructor() {
        this.Position = null;
        this.Direct = Direct.West;
        this.NextDirect = Direct.West;
        this.PrevDirect = Direct.West;
        this.Position = new Position();
        this.Direct = Direct.West;
        this.NextDirect = Direct.West;
    }
    GoHome() {
        this.Position.CenterX = 12.5;
        this.Position.CenterY = 22;
        this.Direct = Direct.West;
        this.NextDirect = Direct.West;
    }
    Move() {
        if (this.Direct == Direct.West)
            this.Position.CenterX -= 0.1;
        if (this.Direct == Direct.East)
            this.Position.CenterX += 0.1;
        if (this.Direct == Direct.North)
            this.Position.CenterY -= 0.1;
        if (this.Direct == Direct.South)
            this.Position.CenterY += 0.1;
        // �����_�ȉ����ʈȍ~�������CanMove�`�֐������܂��@�\���Ȃ��̂Ŏl�̌ܓ�����
        let x = Math.round(this.Position.CenterX * 10) / 10;
        let y = Math.round(this.Position.CenterY * 10) / 10;
        this.Position.CenterX = x;
        this.Position.CenterY = y;
        // this.NextDirect ���ړ��ł�������ł���Ȃ�this.Direct�ɑ������
        if (CanMoveSouth(x, y) && this.NextDirect == Direct.South)
            this.Direct = Direct.South;
        if (CanMoveNorth(x, y) && this.NextDirect == Direct.North)
            this.Direct = Direct.North;
        if (CanMoveEast(x, y) && this.NextDirect == Direct.East)
            this.Direct = Direct.East;
        if (CanMoveWest(x, y) && this.NextDirect == Direct.West)
            this.Direct = Direct.West;
        // ���[�v�g���l���ɓ������ꍇ�A���Α�����o�Ă���悤�ɂ���
        if ((x == 0 && y == 13) && this.Direct == Direct.West)
            this.Position.CenterX = 25;
        if ((x == 25 && y == 13) && this.Direct == Direct.East)
            this.Position.CenterX = 0;
        // this.Direct���ړ��ł��Ȃ������ł���Ȃ�this.Direct�ɂ� Direct.None�������ē������~�߂�
        if (!CanMoveSouth(x, y) && this.Direct == Direct.South)
            this.Direct = Direct.None;
        if (!CanMoveNorth(x, y) && this.Direct == Direct.North)
            this.Direct = Direct.None;
        if (!CanMoveEast(x, y) && this.Direct == Direct.East)
            this.Direct = Direct.None;
        if (!CanMoveWest(x, y) && this.Direct == Direct.West)
            this.Direct = Direct.None;
        // �p�b�N�}�����a��H�ׂ����A�����X�^�[�ƐڐG�������̏�����
        // �N���X�̊O���ɂ��鉺�L�̂Q�̊֐����ł����Ȃ��B
        CheckEatDot();
        CheckHitMonster();
        // �ړ��ɐ��������ꍇ�A�����this.PrevDirect�ɕۑ����Ă���
        if (this.Direct != Direct.None)
            this.PrevDirect = this.Direct;
    }
    // �p�b�N�}���̈ړ����Ă����������K�؂ȕ`��p�̃C���[�W�����߂�
    GetImageFromDirect(direct) {
        if (direct == Direct.North)
            return pacmanNorthImage;
        else if (direct == Direct.South)
            return pacmanSouthImage;
        else if (direct == Direct.East)
            return pacmanEastImage;
        else if (direct == Direct.West)
            return pacmanWestImage;
        else
            return pacmanWestImage;
    }
    Draw() {
        // �ʂ̂Ƃ����
        // const offsetX = 40; const offsetY = 60;
        // const magnification = 18.0; const charctorSize = 35;�ƒ�`����Ă���
        // �p�b�N�}���̒��S���W���獶��̍��W�����߂�
        let x = this.Position.CenterX * magnification - charctorSize / 2 + offsetX;
        let y = this.Position.CenterY * magnification - charctorSize / 2 + offsetY;
        // �p�b�N�}����this.Direct�Athis.Direct��Direct.None�̏ꍇ��
        // this.PrevDirect����`�悷��Ƃ��Ɏg�p����C���[�W�����߂�
        let pacmanImage = pacmanNorthImage;
        if (this.Direct != Direct.None)
            pacmanImage = this.GetImageFromDirect(this.Direct);
        else
            pacmanImage = this.GetImageFromDirect(this.PrevDirect);
        con.drawImage(pacmanImage, x, y, charctorSize, charctorSize);
    }
}
