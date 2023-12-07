import Link from "next/link";
import Image from "next/image";

export default function ScheduleCard(props) {
  return (
    <div className="">
      {/* <Link href={`${props.slug}`}>
        <article className="card grid gap-4">
          <p className="ml-6 mt-4 text-gray-300  text-xs z-20">{props.scene}</p>
          <div className="ml-6 mb-4  z-20 self-end text-center">
            <p className="text-gray-300 text-base">{props.time}</p>
            <p className="capitalize text-gray-50 text-xs">{props.artist}</p>
          </div>
          <Image className="col-start-1 col-end-2 row-start-1 row-end-3 object-cover z-0 brightness-50 rounded-lg border-2 border-gray-800 h-full w-full" width={320} height={320} src={props.src} alt="Band logo" />
        </article>
      </Link> */}
      <div className="card w-40 bg-base-100 shadow-xl image-full">
        <figure>
          <Image className=" object-cover z-0 brightness-50 rounded-lg border-2 border-gray-800 " width={320} height={320} src={props.src} alt="Band logo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{props.scene}</h2>
          <p>{props.time}</p>
          <Link className="card-actions justify-end">
            <button className="btn-primary">{props.artist}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
