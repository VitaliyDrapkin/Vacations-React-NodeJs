import React, { Component } from "react";
import s from "./Vacation.module.css";
import { Vacation } from "../../../../Model/Vacation";
import defaultImage from "../../../../assets/images/defaultImage.jpg";
import xIcon from "../../../../assets/images/icons/x.png";
import heart from "../../../../assets/images/icons/heart.png";
import editIcon from "../../../../assets/images/icons/edit.png";

//------------types--------------

interface VacationItemProps {
  vacation: Vacation;
  isAdmin: boolean;
  isModalOpen: boolean;
  onOpenModalEditVacation(vacation: Vacation): void;
  onDeleteVacation(id: number, imgUrl: string): void;
  onFollow(id: number): void;
  onUnfollow(id: number): void;
}

interface VacationItemState {
  isHover: boolean;
  buttonClicked: boolean;
}

//-----------component-------------

export default class VacationItem extends Component<
  VacationItemProps,
  VacationItemState
> {
  constructor(props: VacationItemProps) {
    super(props);
    this.state = {
      isHover: false,
      buttonClicked: false,
    };
  }

  onClickFollow = async () => {
    this.setState({ buttonClicked: true });
    if (!this.state.buttonClicked) {
      await this.props.onFollow(this.props.vacation.id);
    }
    this.setState({ buttonClicked: false });
  };

  onClickUnfollow = async () => {
    this.setState({ buttonClicked: true });
    if (!this.state.buttonClicked) {
      await this.props.onUnfollow(this.props.vacation.id);
    }
    this.setState({ buttonClicked: false });
  };

  hover = (isHover: boolean): void => {
    this.setState({ isHover });
  };

  deleteVacation = async () => {
    this.props.onDeleteVacation(
      this.props.vacation.id,
      this.props.vacation.imageUrl
    );
  };

  render() {
    return (
      <div
        className={s.vacationItem}
        onMouseEnter={() => this.hover(true)}
        onMouseLeave={() => this.hover(false)}
      >
        <div className={s.item}>
          <div className={s.header}>
            <div
              className={
                this.props.isAdmin ? s.followsCountAdmin : s.followsCount
              }
            >
              <div>{this.props.vacation.followers} </div>
              <img src={heart} alt="likes" />
            </div>
            <div className={s.descriptionPrice}>
              <div className={s.description}>
                {this.props.vacation.description}
              </div>
              <div className={s.price}>
                Price : {this.props.vacation.price} $
              </div>
            </div>
            {this.props.isAdmin ? (
              this.state.isHover &&
              !this.props.isModalOpen && (
                <div className={s.adminButtons}>
                  <div className={s.xIcon} onClick={this.deleteVacation}>
                    <img src={xIcon} alt="X" />
                  </div>
                  <br />
                  <div
                    className={s.editIcon}
                    onClick={() =>
                      this.props.onOpenModalEditVacation(this.props.vacation)
                    }
                  >
                    <img src={editIcon} alt="edit" />
                  </div>
                  <div className={s.vacationId}>
                    Id {this.props.vacation.id}
                  </div>
                </div>
              )
            ) : (
              <div className={s.followBTN}>
                {this.props.vacation.isFollowed ? (
                  <button
                    disabled={this.state.buttonClicked}
                    className={s.unfollow}
                    onClick={this.onClickUnfollow}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={this.state.buttonClicked}
                    className={s.follow}
                    onClick={this.onClickFollow}
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
          <div className={s.picture}>
            <img src={this.props.vacation.imageUrl || defaultImage} alt="" />
          </div>
          <div className={s.date}>
            <span>
              From {this.props.vacation.startDate} to{" "}
              {this.props.vacation.endDate}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
